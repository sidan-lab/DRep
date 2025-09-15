export interface ContributorRepository {
    name: string;
    commits: number;
    pull_requests: number;
    contributions: number;
    commit_timestamps: string[];
    pr_timestamps: string[];
}

export interface Contributor {
    login: string;
    avatar_url: string;
    commits: number;
    pull_requests: number;
    contributions: number;
    repositories: ContributorRepository[];
}

export interface FilteredContributorMetrics {
    commits: number;
    pullRequests: number;
    repositories: number;
    contributions: number;
} 