import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { getConfig, getRepoRoot } from './config-loader.js';

export async function fetchYearlyContributors(githubToken) {
    const config = getConfig();
    const repoRoot = getRepoRoot();
    console.log('\nFetching repository contributors...');

    // Create contributions directory if it doesn't exist
    const contributionsDir = path.join(repoRoot, config.outputPaths.baseDir, config.outputPaths.statsDir, config.outputPaths.contributionsDir);
    if (!fs.existsSync(contributionsDir)) {
        fs.mkdirSync(contributionsDir, { recursive: true });
    }

    // Get all repositories with pagination
    let allRepos = [];
    let page = 1;
    let hasMoreRepos = true;
    let earliestYear = new Date().getFullYear(); // Initialize with current year

    // Fetch repositories from main organization
    while (hasMoreRepos) {
        try {
            console.log(`Fetching repositories page ${page} from ${config.organization.name}...`);
            const reposResponse = await axios.get(`https://api.github.com/orgs/${config.organization.name}/repos`, {
                params: {
                    type: 'all',
                    per_page: 100,
                    page: page
                },
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': `token ${githubToken}`
                }
            });

            if (reposResponse.data.length === 0) {
                hasMoreRepos = false;
            } else {
                // Find the earliest repository creation date and add organization info
                reposResponse.data.forEach(repo => {
                    const createdYear = new Date(repo.created_at).getFullYear();
                    if (createdYear < earliestYear) {
                        earliestYear = createdYear;
                    }
                    // Add organization information to each repository
                    repo.sourceOrganization = config.organization.name;
                });
                allRepos = allRepos.concat(reposResponse.data);
                page++;
            }
        } catch (error) {
            console.error(`Error fetching repositories page ${page}:`, error.message);
            hasMoreRepos = false;
        }
    }

    // Handle extended organizations - support both single string and array
    const extendedOrgs = [];
    if (config.extendedOrgName) {
        if (Array.isArray(config.extendedOrgName)) {
            extendedOrgs.push(...config.extendedOrgName.filter(org => org && org.trim() !== ''));
        } else if (typeof config.extendedOrgName === 'string' && config.extendedOrgName.trim() !== '') {
            extendedOrgs.push(config.extendedOrgName);
        }
    }

    // Fetch repositories from extended organizations
    for (const extendedOrg of extendedOrgs) {
        console.log(`\nFetching repositories from extended organization: ${extendedOrg}`);
        page = 1;
        hasMoreRepos = true;

        while (hasMoreRepos) {
            try {
                console.log(`Fetching repositories page ${page} from ${extendedOrg}...`);
                const reposResponse = await axios.get(`https://api.github.com/orgs/${extendedOrg}/repos`, {
                    params: {
                        type: 'all',
                        per_page: 100,
                        page: page
                    },
                    headers: {
                        'Accept': 'application/vnd.github.v3+json',
                        'Authorization': `token ${githubToken}`
                    }
                });

                if (reposResponse.data.length === 0) {
                    hasMoreRepos = false;
                } else {
                    // Find the earliest repository creation date and add organization info
                    reposResponse.data.forEach(repo => {
                        const createdYear = new Date(repo.created_at).getFullYear();
                        if (createdYear < earliestYear) {
                            earliestYear = createdYear;
                        }
                        // Add organization information to each repository
                        repo.sourceOrganization = extendedOrg;
                    });
                    allRepos = allRepos.concat(reposResponse.data);
                    page++;
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error(`Extended organization '${extendedOrg}' not found. Please check the organization name in the config.`);
                } else if (error.response && error.response.status === 403) {
                    console.error(`Access denied to extended organization '${extendedOrg}'. Please check your GitHub token permissions.`);
                } else {
                    console.error(`Error fetching repositories page ${page} from ${extendedOrg}:`, error.message);
                }
                hasMoreRepos = false;
            }
        }
    }

    console.log(`Found ${allRepos.length} repositories across all organizations`);
    console.log(`Earliest repository creation year: ${earliestYear}`);

    // Filter out excluded repositories
    const excludedRepos = Array.isArray(config.excludedRepositories) ? config.excludedRepositories : [];
    const extendedExcludedRepos = Array.isArray(config.extendedOrgExcludedRepos) ? config.extendedOrgExcludedRepos : [];
    const allExcludedRepos = [...excludedRepos, ...extendedExcludedRepos];
    const filteredRepos = allRepos.filter(repo => !allExcludedRepos.includes(repo.name));

    if (allExcludedRepos.length > 0) {
        console.log(`Excluded repositories from ${config.organization.name}: ${excludedRepos.join(', ')}`);
        if (extendedOrgs.length > 0 && extendedExcludedRepos.length > 0) {
            console.log(`Excluded repositories from extended organizations: ${extendedExcludedRepos.join(', ')}`);
        }
        console.log(`Processing ${filteredRepos.length} repositories (${allRepos.length - filteredRepos.length} excluded)`);
    }

    // Get existing yearly files
    const existingYears = new Set();
    if (fs.existsSync(contributionsDir)) {
        const files = fs.readdirSync(contributionsDir);
        files.forEach(file => {
            const match = file.match(/contributors-(\d{4})\.json/);
            if (match) {
                existingYears.add(parseInt(match[1]));
            }
        });
    }

    const currentYear = new Date().getFullYear();
    // If we have existing years, only update the current year
    // Otherwise, process all years from earliest to current
    const yearsToUpdate = existingYears.size > 0 ?
        [currentYear] :
        Array.from({ length: currentYear - earliestYear + 1 }, (_, i) => earliestYear + i);

    console.log(`Years to process: ${yearsToUpdate.join(', ')}`);

    // Process each year
    for (const year of yearsToUpdate) {
        console.log(`\nProcessing data for year ${year}...`);
        const contributorsMap = new Map();

        for (const repo of filteredRepos) {
            console.log(`Fetching contributors for ${repo.name} (${repo.sourceOrganization})...`);

            // Check if this is a forked repository
            const isFork = repo.fork;
            const upstreamOrg = repo.source?.owner?.login;

            if (isFork) {
                console.log(`  - This is a fork of ${upstreamOrg}/${repo.source?.name}`);
            } else {
                console.log(`  - This is an original repository`);
            }

            try {
                // Determine the organization name for this repository
                const repoOrgName = repo.owner?.login || repo.sourceOrganization;

                // For forked repositories, only fetch commits made to our fork
                // For original repositories, fetch all commits
                if (!isFork || (isFork && repoOrgName === repo.sourceOrganization)) {
                    // Fetch commits with timestamps
                    let commitsPage = 1;
                    let hasMoreCommits = true;

                    while (hasMoreCommits) {
                        try {
                            const commitsResponse = await axios.get(`https://api.github.com/repos/${repoOrgName}/${repo.name}/commits`, {
                                params: {
                                    per_page: 100,
                                    page: commitsPage
                                },
                                headers: {
                                    'Accept': 'application/vnd.github.v3+json',
                                    'Authorization': `token ${githubToken}`
                                }
                            });

                            if (commitsResponse.data.length === 0) {
                                hasMoreCommits = false;
                            } else {
                                for (const commit of commitsResponse.data) {
                                    if (!commit.author || !commit.author.login) continue;

                                    const commitDate = new Date(commit.commit.author.date);
                                    if (commitDate.getFullYear() !== year) continue;

                                    const login = commit.author.login;
                                    const timestamp = commit.commit.author.date;

                                    if (!contributorsMap.has(login)) {
                                        const repoData = {};
                                        repoData[repo.name] = {
                                            commits: 1,
                                            pull_requests: 0,
                                            contributions: 1,
                                            commit_timestamps: [timestamp],
                                            pr_timestamps: [],
                                            organization: repo.sourceOrganization,
                                            isFork: isFork,
                                            upstreamOrg: upstreamOrg
                                        };

                                        contributorsMap.set(login, {
                                            login: login,
                                            avatar_url: commit.author.avatar_url,
                                            commits: 1,
                                            pull_requests: 0,
                                            contributions: 1,
                                            repositories: repoData
                                        });
                                    } else {
                                        const existingContributor = contributorsMap.get(login);
                                        existingContributor.commits += 1;
                                        existingContributor.contributions += 1;

                                        if (existingContributor.repositories[repo.name]) {
                                            existingContributor.repositories[repo.name].commits += 1;
                                            existingContributor.repositories[repo.name].contributions += 1;
                                            existingContributor.repositories[repo.name].commit_timestamps.push(timestamp);
                                        } else {
                                            existingContributor.repositories[repo.name] = {
                                                commits: 1,
                                                pull_requests: 0,
                                                contributions: 1,
                                                commit_timestamps: [timestamp],
                                                pr_timestamps: [],
                                                organization: repo.sourceOrganization,
                                                isFork: isFork,
                                                upstreamOrg: upstreamOrg
                                            };
                                        }
                                    }
                                }
                                commitsPage++;
                            }
                        } catch (error) {
                            if (error.response && error.response.status === 404) {
                                console.warn(`Repository ${repo.name} might be private or not exist. Skipping commits.`);
                            } else if (error.response && error.response.status === 403) {
                                console.warn(`API rate limit exceeded or insufficient permissions for ${repo.name}. Skipping commits.`);
                            } else {
                                console.error(`Error fetching commits for ${repo.name} page ${commitsPage}:`, error.message);
                            }
                            hasMoreCommits = false;
                        }
                    }
                }

                // Handle pull requests based on repository type
                if (isFork) {
                    // For forked repositories, only fetch PRs made FROM our fork TO the upstream repo
                    console.log(`  - Fetching pull requests made FROM our fork TO upstream ${upstreamOrg}/${repo.source?.name}`);

                    // Get PRs made from our fork to upstream
                    let page = 1;
                    let pullsData = [];
                    let hasMorePulls = true;
                    let processedPRs = new Set();

                    while (hasMorePulls) {
                        try {
                            // Fetch PRs made from our fork to the upstream repository
                            const pullsResponse = await axios.get(
                                `https://api.github.com/repos/${upstreamOrg}/${repo.source?.name}/pulls`,
                                {
                                    params: {
                                        state: 'closed',
                                        per_page: 100,
                                        page: page
                                    },
                                    headers: {
                                        'Accept': 'application/vnd.github.v3+json',
                                        'Authorization': `token ${githubToken}`
                                    }
                                }
                            );

                            if (pullsResponse.data.length === 0) {
                                hasMorePulls = false;
                            } else {
                                // Filter PRs that were made from our fork
                                const ourForkPRs = pullsResponse.data.filter(pr => {
                                    if (!pr.merged_at) return false;
                                    const prDate = new Date(pr.merged_at);
                                    if (prDate.getFullYear() !== year) return false;

                                    // Check if the PR head repo is our fork
                                    return pr.head?.repo?.owner?.login === repo.sourceOrganization &&
                                        pr.head?.repo?.name === repo.name;
                                });

                                ourForkPRs.forEach(pr => {
                                    if (!processedPRs.has(pr.number)) {
                                        processedPRs.add(pr.number);
                                        pullsData.push(pr);
                                    }
                                });

                                console.log(`  - Found ${ourForkPRs.length} PRs from our fork on page ${page}`);
                                page++;
                            }
                        } catch (error) {
                            if (error.response && error.response.status === 404) {
                                console.warn(`Upstream repository ${upstreamOrg}/${repo.source?.name} might be private or not exist. Skipping PRs.`);
                            } else if (error.response && error.response.status === 403) {
                                console.warn(`API rate limit exceeded or insufficient permissions for upstream repo. Skipping PRs.`);
                            } else {
                                console.error(`Error fetching PRs from our fork to upstream page ${page}:`, error.message);
                            }
                            hasMorePulls = false;
                        }
                    }

                    console.log(`Total PRs from our fork to upstream: ${pullsData.length}`);

                    // Count PRs by user
                    pullsData.forEach(pr => {
                        if (!pr.user || !pr.user.login) return;
                        if (!pr.merged_at) return;

                        const login = pr.user.login;
                        const timestamp = pr.merged_at;

                        if (!contributorsMap.has(login)) {
                            const repoData = {};
                            repoData[repo.name] = {
                                commits: 0,
                                pull_requests: 1,
                                contributions: 1,
                                commit_timestamps: [],
                                pr_timestamps: [timestamp],
                                organization: repo.sourceOrganization,
                                isFork: isFork,
                                upstreamOrg: upstreamOrg
                            };

                            contributorsMap.set(login, {
                                login: login,
                                avatar_url: pr.user.avatar_url,
                                commits: 0,
                                pull_requests: 1,
                                contributions: 1,
                                repositories: repoData
                            });
                        } else {
                            const contributor = contributorsMap.get(login);
                            contributor.pull_requests += 1;
                            contributor.contributions += 1;

                            if (contributor.repositories[repo.name]) {
                                contributor.repositories[repo.name].pull_requests += 1;
                                contributor.repositories[repo.name].contributions += 1;
                                contributor.repositories[repo.name].pr_timestamps.push(timestamp);
                            } else {
                                contributor.repositories[repo.name] = {
                                    commits: 0,
                                    pull_requests: 1,
                                    contributions: 1,
                                    commit_timestamps: [],
                                    pr_timestamps: [timestamp],
                                    organization: repo.sourceOrganization,
                                    isFork: isFork,
                                    upstreamOrg: upstreamOrg
                                };
                            }
                        }
                    });
                } else {
                    // For original repositories, fetch all PRs made TO our repo
                    console.log(`  - Fetching all pull requests made TO our original repository`);

                    // Fetch pull requests from both pulls and issues endpoints
                    let page = 1;
                    let pullsData = [];
                    let hasMorePulls = true;
                    let processedPRs = new Set(); // Track processed PRs to avoid duplicates

                    while (hasMorePulls) {
                        try {
                            // First try the pulls endpoint
                            const pullsResponse = await axios.get(
                                `https://api.github.com/repos/${repoOrgName}/${repo.name}/pulls`,
                                {
                                    params: {
                                        state: 'closed',
                                        per_page: 100,
                                        page: page
                                    },
                                    headers: {
                                        'Accept': 'application/vnd.github.v3+json',
                                        'Authorization': `token ${githubToken}`
                                    }
                                }
                            );

                            if (pullsResponse.data.length === 0) {
                                hasMorePulls = false;
                            } else {
                                const mergedPRs = pullsResponse.data.filter(pr => {
                                    if (!pr.merged_at) return false;
                                    const prDate = new Date(pr.merged_at);
                                    return prDate.getFullYear() === year;
                                });

                                // Add to processed set and pulls data
                                mergedPRs.forEach(pr => {
                                    if (!processedPRs.has(pr.number)) {
                                        processedPRs.add(pr.number);
                                        pullsData.push(pr);
                                    }
                                });

                                console.log(`  - Found ${mergedPRs.length} merged PRs on page ${page}`);
                                page++;
                            }
                        } catch (error) {
                            if (error.response && error.response.status === 404) {
                                console.warn(`Repository ${repo.name} might be private or not exist. Skipping pulls.`);
                            } else if (error.response && error.response.status === 403) {
                                console.warn(`API rate limit exceeded or insufficient permissions for ${repo.name}. Skipping pulls.`);
                            } else {
                                console.error(`Error fetching pulls for ${repo.name} page ${page}:`, error.message);
                            }
                            hasMorePulls = false;
                        }
                    }

                    // Then try the issues endpoint to catch any PRs missed by the pulls endpoint
                    page = 1;
                    hasMorePulls = true;

                    while (hasMorePulls) {
                        try {
                            const issuesResponse = await axios.get(
                                `https://api.github.com/repos/${repoOrgName}/${repo.name}/issues`,
                                {
                                    params: {
                                        state: 'closed',
                                        per_page: 100,
                                        page: page
                                    },
                                    headers: {
                                        'Accept': 'application/vnd.github.v3+json',
                                        'Authorization': `token ${githubToken}`
                                    }
                                }
                            );

                            if (issuesResponse.data.length === 0) {
                                hasMorePulls = false;
                            } else {
                                // Filter for pull requests (issues with pull_request field)
                                const prsFromIssues = issuesResponse.data.filter(issue =>
                                    issue.pull_request &&
                                    !processedPRs.has(issue.number)
                                );

                                // Fetch additional PR details for each PR from issues
                                for (const prIssue of prsFromIssues) {
                                    try {
                                        const prDetails = await axios.get(
                                            `https://api.github.com/repos/${repoOrgName}/${repo.name}/pulls/${prIssue.number}`,
                                            {
                                                headers: {
                                                    'Accept': 'application/vnd.github.v3+json',
                                                    'Authorization': `token ${githubToken}`
                                                }
                                            }
                                        );

                                        if (prDetails.data.merged_at) {
                                            const prDate = new Date(prDetails.data.merged_at);
                                            if (prDate.getFullYear() === year) {
                                                processedPRs.add(prIssue.number);
                                                pullsData.push(prDetails.data);
                                            }
                                        }
                                    } catch (error) {
                                        console.warn(`Could not fetch details for PR #${prIssue.number}: ${error.message}`);
                                    }
                                }
                                page++;
                            }
                        } catch (error) {
                            if (error.response && error.response.status === 404) {
                                console.warn(`Repository ${repo.name} might be private or not exist. Skipping issues.`);
                            } else if (error.response && error.response.status === 403) {
                                console.warn(`API rate limit exceeded or insufficient permissions for ${repo.name}. Skipping issues.`);
                            } else {
                                console.error(`Error fetching issues for ${repo.name} page ${page}:`, error.message);
                            }
                            hasMorePulls = false;
                        }
                    }

                    console.log(`Total merged PRs found for ${repo.name}: ${pullsData.length}`);

                    // Count PRs by user and store timestamps
                    pullsData.forEach(pr => {
                        if (!pr.user || !pr.user.login) return;
                        if (!pr.merged_at) return;

                        const login = pr.user.login;
                        const timestamp = pr.merged_at;

                        if (!contributorsMap.has(login)) {
                            // If this user isn't a contributor yet, add them
                            const repoData = {};
                            repoData[repo.name] = {
                                commits: 0,
                                pull_requests: 1,
                                contributions: 1,
                                commit_timestamps: [],
                                pr_timestamps: [timestamp],
                                organization: repo.sourceOrganization,
                                isFork: isFork,
                                upstreamOrg: upstreamOrg
                            };

                            contributorsMap.set(login, {
                                login: login,
                                avatar_url: pr.user.avatar_url,
                                commits: 0,
                                pull_requests: 1,
                                contributions: 1,
                                repositories: repoData
                            });
                        } else {
                            // User exists, increment PR count
                            const contributor = contributorsMap.get(login);
                            contributor.pull_requests += 1;
                            contributor.contributions += 1;

                            // Update repository data
                            if (contributor.repositories[repo.name]) {
                                contributor.repositories[repo.name].pull_requests += 1;
                                contributor.repositories[repo.name].contributions += 1;
                                contributor.repositories[repo.name].pr_timestamps.push(timestamp);
                            } else {
                                contributor.repositories[repo.name] = {
                                    commits: 0,
                                    pull_requests: 1,
                                    contributions: 1,
                                    commit_timestamps: [],
                                    pr_timestamps: [timestamp],
                                    organization: repo.sourceOrganization,
                                    isFork: isFork,
                                    upstreamOrg: upstreamOrg
                                };
                            }
                        }
                    });
                }
            } catch (error) {
                console.error(`Error fetching data for ${repo.name}:`, error.message);
            }
        }

        // Convert repositories from object to array for each contributor
        const contributors = Array.from(contributorsMap.values()).map(contributor => {
            // Convert repositories object to array
            const reposArray = Object.entries(contributor.repositories).map(([repoName, repoData]) => {
                return {
                    name: repoName,
                    ...repoData,
                    commit_timestamps: repoData.commit_timestamps.sort((a, b) => new Date(b) - new Date(a)),
                    pr_timestamps: repoData.pr_timestamps.sort((a, b) => new Date(b) - new Date(a))
                };
            });

            // Sort repos by total contributions
            reposArray.sort((a, b) => b.contributions - a.contributions);

            return {
                ...contributor,
                repositories: reposArray
            };
        });

        // Sort contributors by total contributions
        contributors.sort((a, b) => b.contributions - a.contributions);

        // Save yearly data
        const yearlyStats = {
            year: year,
            unique_count: contributors.length,
            contributors,
            total_pull_requests: contributors.reduce((sum, c) => sum + c.pull_requests, 0),
            total_commits: contributors.reduce((sum, c) => sum + c.commits, 0),
            total_contributions: contributors.reduce((sum, c) => sum + c.commits + c.pull_requests, 0)
        };

        const yearlyFilePath = path.join(contributionsDir, `contributors-${year}.json`);
        fs.writeFileSync(yearlyFilePath, JSON.stringify(yearlyStats, null, 2), 'utf8');
        console.log(`Saved contributors data for ${year} to ${yearlyFilePath}`);
    }
} 