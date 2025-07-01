import axios from 'axios';
import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { getConfig, getRepoRoot } from './config-loader.js';

// Add Discord webhook URL - this should be set as an environment variable
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

async function sendDiscordNotification(message) {
    if (!DISCORD_WEBHOOK_URL) {
        console.error('Discord webhook URL not set');
        return;
    }

    try {
        await axios.post(DISCORD_WEBHOOK_URL, {
            content: message
        });
    } catch (error) {
        console.error('Failed to send Discord notification:', error.message);
    }
}

export async function fetchSidanStats(githubToken) {
    const config = getConfig();
    const repoRoot = getRepoRoot();
    console.log('Fetching GitHub statistics...');

    // GitHub stats (still only for one main package, e.g., csl_rs_browser)
    // You may want to generalize this too, but for now, keep as is or pick the first package as the main one
    const mainPkgKey = Object.keys(config.npmPackages)[0];
    const mainPkgName = config.npmPackages[mainPkgKey];

    const corePackageJsonResponse = await axios.get(
        'https://api.github.com/search/code',
        {
            params: {
                q: `"${mainPkgName}" in:file filename:package.json`
            },
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `token ${githubToken}`
            }
        }
    );
    console.log('GitHub package.json mentions:', corePackageJsonResponse.data.total_count);

    const coreAnyFileResponse = await axios.get(
        'https://api.github.com/search/code',
        {
            params: {
                q: `"${mainPkgName}"`
            },
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `token ${githubToken}`
            }
        }
    );
    console.log('GitHub total mentions:', coreAnyFileResponse.data.total_count);

    // Read core_in_repositories data from file (fallback value)
    const coreInReposPath = path.join(repoRoot, config.outputPaths.baseDir, config.outputPaths.statsDir, 'core-in-repositories.json');
    let coreInReposData = { last_updated: '', core_in_repositories: 0 };
    if (fs.existsSync(coreInReposPath)) {
        coreInReposData = JSON.parse(fs.readFileSync(coreInReposPath, 'utf8'));
    }

    console.log('Fetching GitHub Dependents count from webpage using Cheerio...');

    // Helper function to fetch the dependents count using Cheerio.
    async function fetchDependentsCount() {
        try {
            const dependentsUrl = `https://github.com/${config.organization.name}/${config.repositories.dependentsCountRepo}/network/dependents`;
            const response = await axios.get(dependentsUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            const html = response.data;
            const $ = cheerio.load(html);

            // Use a selector targeting the anchor element with class "btn-link selected"
            const selector = 'a.btn-link.selected';
            const countText = $(selector).text().trim();

            if (countText) {
                // For example, countText might be "689 Repositories"
                const [rawCount] = countText.split(' ');
                const dependentsCount = parseInt(rawCount.replace(/,/g, ''), 10);
                if (!isNaN(dependentsCount)) {
                    return dependentsCount;
                } else {
                    console.error('Extracted text is not a valid number:', countText);
                    await sendDiscordNotification('⚠️ Failed to parse dependents count from GitHub. Extracted text is not a valid number.');
                    return null;
                }
            } else {
                console.error('CSS selector did not match any content.');
                await sendDiscordNotification('⚠️ Failed to fetch dependents count from GitHub. CSS selector did not match any content.');
                return null;
            }
        } catch (error) {
            console.error('Error fetching dependents count using Cheerio:', error.message);
            await sendDiscordNotification('⚠️ Failed to fetch dependents count from GitHub. Error: ' + error.message);
            return null;
        }
    }

    const fetchedDependentsCount = await fetchDependentsCount();
    let finalDependentsCount;
    if (fetchedDependentsCount !== null) {
        console.log('Fetched Dependents Count:', fetchedDependentsCount);
        finalDependentsCount = fetchedDependentsCount;
        // Update the file with the new count and timestamp
        coreInReposData = {
            last_updated: new Date().toISOString(),
            core_in_repositories: fetchedDependentsCount
        };

        // Ensure the directory exists before writing the file.
        const dir = path.dirname(coreInReposPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(coreInReposPath, JSON.stringify(coreInReposData, null, 2), 'utf8');
    } else {
        console.log('Using fallback value from file for Dependents Count:', coreInReposData.core_in_repositories);
        finalDependentsCount = coreInReposData.core_in_repositories;
    }

    console.log('\nFetching NPM statistics...');
    const currentDate = new Date();
    const lastDay = new Date(currentDate);
    lastDay.setDate(lastDay.getDate() - 1);

    // Calculate last week using proper week boundaries (Monday to Sunday)
    const lastWeek = new Date(currentDate);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastWeekStart = new Date(lastWeek);
    lastWeekStart.setDate(lastWeekStart.getDate() - lastWeekStart.getDay() + 1); // Set to Monday
    const lastWeekEnd = new Date(lastWeekStart);
    lastWeekEnd.setDate(lastWeekEnd.getDate() + 6); // Set to Sunday

    // Calculate last month using calendar month boundaries
    const lastMonth = new Date(currentDate);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthStart = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
    const lastMonthEnd = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);

    // Calculate last year using calendar year boundaries
    const lastYear = new Date(currentDate);
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const lastYearStart = new Date(lastYear.getFullYear(), 0, 1); // January 1st of last year
    const lastYearEnd = new Date(lastYear.getFullYear(), 11, 31); // December 31st of last year

    const formatDate = date => date.toISOString().split('T')[0];

    // Fetch NPM stats for all packages
    const npmStats = {};
    for (const [key, pkgName] of Object.entries(config.npmPackages)) {
        // Downloads
        const getDownloads = async (startDate, endDate) => {
            const response = await axios.get(
                `https://api.npmjs.org/downloads/point/${startDate}:${endDate}/${pkgName}`
            );
            return response.data.downloads;
        };
        const lastDayDownloads = await getDownloads(formatDate(lastDay), formatDate(currentDate));
        const lastWeekDownloads = await getDownloads(formatDate(lastWeekStart), formatDate(lastWeekEnd));
        const lastMonthDownloads = await getDownloads(formatDate(lastMonthStart), formatDate(lastMonthEnd));
        const lastYearDownloads = await getDownloads(formatDate(lastYearStart), formatDate(lastYearEnd));
        const yearDownloadsResp = await axios.get(`https://api.npmjs.org/downloads/point/last-year/${pkgName}`);
        // Version
        const packageInfo = await axios.get(`https://registry.npmjs.org/${pkgName}`);
        const latestVersion = packageInfo.data['dist-tags'].latest;
        // Dependents
        const dependentsResponse = await axios.get(
            'https://registry.npmjs.org/-/v1/search',
            { params: { text: `dependencies:${pkgName}`, size: 1 } }
        );
        npmStats[key] = {
            downloads: {
                last_day: lastDayDownloads,
                last_week: lastWeekDownloads,
                last_month: lastMonthDownloads,
                last_year: lastYearDownloads,
                last_12_months: yearDownloadsResp.data.downloads
            },
            latest_version: latestVersion,
            dependents_count: dependentsResponse.data.total
        };
    }

    // Compose return object
    return {
        github: {
            core_in_package_json: corePackageJsonResponse.data.total_count,
            core_in_any_file: coreAnyFileResponse.data.total_count,
            core_in_repositories: finalDependentsCount
        },
        npm: npmStats,
        urls: {
            // Optionally, add npm-stat URLs for each package
        }
    };
}

export async function fetchSidanContributors(githubToken) {
    const config = getConfig();
    console.log('\nFetching repository contributors...');

    // Get all repositories with pagination
    let allRepos = [];
    let page = 1;
    let hasMoreRepos = true;

    // Fetch repositories from main organization
    while (hasMoreRepos) {
        try {
            console.log(`Fetching repositories page ${page} from ${config.organization.name}...`);
            const reposResponse = await axios.get(`https://api.github.com/orgs/${config.organization.name}/repos`, {
                params: {
                    type: 'all',    // Include all repos: public, private, forks, etc.
                    per_page: 100,  // Max allowed per page
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
                        type: 'all',    // Include all repos: public, private, forks, etc.
                        per_page: 100,  // Max allowed per page
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

    console.log(`Found ${allRepos.length} repositories across all organizations:`);
    allRepos.forEach(repo => {
        console.log(`- ${repo.name} (${repo.private ? 'private' : 'public'}${repo.fork ? ', fork' : ''})`);
    });

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

    const contributorsMap = new Map();

    for (const repo of filteredRepos) {
        console.log(`Fetching contributors for ${repo.name}...`);
        try {
            // Determine the organization name for this repository
            const repoOrgName = repo.owner?.login || config.organization.name;

            // --- Forked repo logic ---
            if (repo.fork && repo.parent) {
                // Only count commits unique to the fork (not inherited from parent)
                const parentOwner = repo.parent.owner.login;
                const parentRepo = repo.parent.name;
                const parentBranch = repo.parent.default_branch;
                const forkOwner = repo.owner.login;
                const forkRepo = repo.name;
                const forkBranch = repo.default_branch;
                const compareUrl = `https://api.github.com/repos/${parentOwner}/${parentRepo}/compare/${parentBranch}...${forkOwner}:${forkBranch}`;
                let compareResp;
                try {
                    compareResp = await axios.get(compareUrl, {
                        headers: {
                            'Accept': 'application/vnd.github.v3+json',
                            'Authorization': `token ${githubToken}`
                        }
                    });
                } catch (error) {
                    console.error(`Error comparing fork and parent for ${repo.name}:`, error.message);
                    continue;
                }
                const uniqueCommits = compareResp.data.commits || [];
                for (const commit of uniqueCommits) {
                    if (!commit.author || !commit.author.login) continue;
                    const login = commit.author.login;
                    if (!contributorsMap.has(login)) {
                        const repoData = {};
                        repoData[repo.name] = {
                            commits: 1,
                            pull_requests: 0,
                            contributions: 1
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
                        } else {
                            existingContributor.repositories[repo.name] = {
                                commits: 1,
                                pull_requests: 0,
                                contributions: 1
                            };
                        }
                    }
                }
            } else {
                // --- Original logic for non-forks ---
                // Fetch commits with timestamps
                console.log(`Fetching commits with timestamps for ${repo.name}...`);
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
                            console.log(`  - Processing ${commitsResponse.data.length} commits on page ${commitsPage}`);
                            for (const commit of commitsResponse.data) {
                                if (!commit.author || !commit.author.login) continue;
                                const login = commit.author.login;
                                if (!contributorsMap.has(login)) {
                                    const repoData = {};
                                    repoData[repo.name] = {
                                        commits: 1,
                                        pull_requests: 0,
                                        contributions: 1
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
                                    } else {
                                        existingContributor.repositories[repo.name] = {
                                            commits: 1,
                                            pull_requests: 0,
                                            contributions: 1
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

            // Fetch pull requests for this repo
            console.log(`Fetching merged pull requests for ${repo.name}...`);
            let page = 1;
            let pullsData = [];
            let hasMorePulls = true;

            // First get merged PRs via pulls endpoint
            while (hasMorePulls) {
                try {
                    const pullsResponse = await axios.get(
                        `https://api.github.com/repos/${repoOrgName}/${repo.name}/pulls`,
                        {
                            params: {
                                state: 'closed',  // Get closed PRs (merged ones are a subset of closed)
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
                        // Filter to only include merged PRs
                        const mergedPRs = pullsResponse.data.filter(pr => pr.merged_at !== null);
                        console.log(`  - Found ${mergedPRs.length} merged PRs on page ${page}`);
                        pullsData = pullsData.concat(mergedPRs);
                        page++;
                    }
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        console.warn(`Repository ${repo.name} might be private or not exist. Skipping regular PRs.`);
                    } else if (error.response && error.response.status === 403) {
                        console.warn(`API rate limit exceeded or insufficient permissions for ${repo.name}. Skipping regular PRs.`);
                    } else {
                        console.error(`Error fetching PRs for ${repo.name} page ${page}:`, error.message);
                    }
                    hasMorePulls = false;
                }
            }

            // Also try the issues endpoint which can sometimes catch PRs missed by the pulls endpoint
            console.log(`Fetching merged PRs via issues endpoint for ${repo.name}...`);
            page = 1;
            hasMorePulls = true;

            while (hasMorePulls) {
                try {
                    // Use the issues endpoint which also lists PRs
                    const issuesResponse = await axios.get(
                        `https://api.github.com/repos/${repoOrgName}/${repo.name}/issues`,
                        {
                            params: {
                                state: 'all',
                                filter: 'all',
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
                        // Filter to only include pull requests from issues
                        const prsFromIssues = issuesResponse.data.filter(issue => issue.pull_request);
                        console.log(`  - Found ${prsFromIssues.length} PRs from issues on page ${page}`);

                        if (prsFromIssues.length > 0) {
                            // For each PR from issues, fetch full PR data to get required info
                            for (const prIssue of prsFromIssues) {
                                try {
                                    const pullUrl = prIssue.pull_request.url;
                                    const fullPrResponse = await axios.get(
                                        pullUrl,
                                        {
                                            headers: {
                                                'Accept': 'application/vnd.github.v3+json',
                                                'Authorization': `token ${githubToken}`
                                            }
                                        }
                                    );

                                    // Check if the PR is merged and we already have this PR
                                    if (fullPrResponse.data.merged_at) {
                                        const existingPrNumbers = new Set(pullsData.map(pr => pr.number));
                                        if (!existingPrNumbers.has(fullPrResponse.data.number)) {
                                            pullsData.push(fullPrResponse.data);
                                            console.log(`  - Added merged PR #${fullPrResponse.data.number} by ${fullPrResponse.data.user?.login || 'unknown'}`);
                                        }
                                    }
                                } catch (error) {
                                    console.error(`Error fetching full PR data for issue #${prIssue.number}:`, error.message);
                                }
                            }
                        }

                        page++;
                    }
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        console.warn(`Repository ${repo.name} might be private or not exist. Skipping issues PRs.`);
                    } else if (error.response && error.response.status === 403) {
                        console.warn(`API rate limit exceeded or insufficient permissions for ${repo.name}. Skipping issues PRs.`);
                    } else {
                        console.error(`Error fetching issues/PRs for ${repo.name} page ${page}:`, error.message);
                    }
                    hasMorePulls = false;
                }
            }

            console.log(`Total merged PRs found for ${repo.name}: ${pullsData.length}`);

            // Log PR authors for debugging
            const prAuthors = pullsData.map(pr => pr.user?.login).filter(Boolean);
            const prAuthorsCount = {};
            prAuthors.forEach(author => {
                prAuthorsCount[author] = (prAuthorsCount[author] || 0) + 1;
            });
            console.log(`PR authors for ${repo.name}:`, prAuthorsCount);

            // Count PRs by user and store timestamps
            pullsData.forEach(pr => {
                if (!pr.user || !pr.user.login) return;

                // Only count merged PRs (this should be redundant now but keeping as a safeguard)
                if (!pr.merged_at) return;

                const login = pr.user.login;

                if (!contributorsMap.has(login)) {
                    // If this user isn't a contributor yet, add them
                    const repoData = {};
                    repoData[repo.name] = {
                        commits: 0,
                        pull_requests: 1,
                        contributions: 1
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
                    } else {
                        contributor.repositories[repo.name] = {
                            commits: 0,
                            pull_requests: 1,
                            contributions: 1
                        };
                    }
                }
            });
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
                ...repoData
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

    return {
        unique_count: contributors.length,
        contributors,
        total_pull_requests: contributors.reduce((sum, c) => sum + c.pull_requests, 0),
        total_commits: contributors.reduce((sum, c) => sum + c.commits, 0),
        total_contributions: contributors.reduce((sum, c) => sum + c.commits + c.pull_requests, 0)
    };
}
