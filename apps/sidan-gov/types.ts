export interface CatalystProject {
    projectDetails: {
        id: number;
        title: string;
        budget: number;
        milestones_qty: number;
        funds_distributed: number;
        project_id: number;
        name: string;
        category: string;
        url: string;
        status: 'In Progress' | 'Completed';
        finished: string;
        voting: {
            proposalId: number;
            yes_votes_count: number;
            no_votes_count: number | null;
            abstain_votes_count: number | null;
            unique_wallets: number;
        };
    };
    milestonesCompleted: number;
}

export interface CatalystData {
    timestamp: string;
    projects: CatalystProject[];
}

// Proposal Types Union
export type ProposalType =
    | 'ParameterChange'
    | 'HardForkInitiation'
    | 'TreasuryWithdrawals'
    | 'NoConfidence'
    | 'NewCommittee'
    | 'NewConstitution'
    | 'InfoAction';

export interface GovernanceVote {
    proposalId: string;
    proposalTxHash: string;
    proposalIndex: number;
    voteTxHash: string;
    blockTime: string;
    vote: 'Yes' | 'No' | 'Abstain';
    metaUrl: string | null;
    metaHash: string | null;
    proposalTitle: string;
    proposalType: ProposalType;
    proposedEpoch: number;
    expirationEpoch: number;
    rationale: string;
}

export interface YearlyStats {
    year: number;
    yearlyTotals: {
        core: number;
        react: number;
        transaction: number;
        wallet: number;
        provider: number;
        coreCsl: number;
        coreCst: number;
    };
    monthlyDownloads: Array<{
        month: string;
        downloads: number;
        trend: '➡️' | '📈' | '📉' | '🔥';
    }>;
    githubStats: Array<{
        month: string;
        projects: number;
        files: number;
        repositories: number;
    }>;
    peakMonth: {
        name: string;
        downloads: number;
    };
    lastUpdated: string;
}

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

export interface CurrentStats {
    github: {
        core_in_package_json: number;
        core_in_any_file: number;
        core_in_repositories: number;
    };
    npm: {
        sidan_csl_rs_browser: {
            downloads: {
                last_12_months: number;
                last_day: number;
                last_week: number;
                last_month: number;
                last_year: number;
            };
            latest_version: string;
            dependents_count: number;
        };
        sidan_csl_rs_nodejs: {
            downloads: {
                last_12_months: number;
                last_day: number;
                last_week: number;
                last_month: number;
                last_year: number;
            };
            latest_version: string;
            dependents_count: number;
        };
        whisky_js_browser: {
            downloads: {
                last_12_months: number;
                last_day: number;
                last_week: number;
                last_month: number;
                last_year: number;
            };
            latest_version: string;
            dependents_count: number;
        };
        whisky_js_nodejs: {
            downloads: {
                last_12_months: number;
                last_day: number;
                last_week: number;
                last_month: number;
                last_year: number;
            };
            latest_version: string;
            dependents_count: number;
        };
    };
    urls: {
        npm_stat_url: string;
        npm_stat_compare_url: string;
    };
    contributors: {
        unique_count: number;
        contributors: Contributor[];
        total_pull_requests: number;
        total_commits: number;
        total_contributions: number;
    };
}

export interface ContributorsData {
    unique_count: number;
    contributors: Contributor[];
    total_pull_requests: number;
    total_commits: number;
    total_contributions: number;
    lastFetched: number;
}

// Context Types
export interface OrgData {
    currentStats: CurrentStats;
    yearlyStats: Record<number, YearlyStats>;
    lastFetched: number;
}

export interface DRepEpochInfo {
    voting_power_lovelace: string;
    total_delegators: number;
}

export interface DRepTimeline {
    epochs: Record<string, DRepEpochInfo>;
    current_epoch: number;
    total_delegators: number;
    total_amount_ada: number;
}

export interface DRepInfo {
    drepId: string;
    amount: string;
    active: boolean;
    registered: boolean;
    expires_epoch_no: number;
    last_updated: string;
    total_drep_proposals?: number;
}

export interface DRepMetadata {
    objectives: string;
    motivations: string;
    qualifications: string;
    givenName: string;
    paymentAddress: string;
    doNotList: boolean;
    references?: Array<{
        "@type": string;
        label: string;
        uri: string;
    }>;
}

export interface DRepDelegationData {
    timeline: DRepTimeline;
    drepInfo: DRepInfo;
    metadata?: DRepMetadata;
}

export interface DRepVotingData {
    votes: GovernanceVote[];
    delegationData: DRepDelegationData | null;
    lastFetched: number;
}

export interface CatalystContextData {
    catalystData: CatalystData;
    lastFetched: number;
}

export interface MonthlyDownload {
    month: string;
    downloads: number;
    trend: string;
}

export interface PackageData {
    name: string;
    downloads: number;
}

export interface FilteredStats {
    packageData?: PackageData[];
    monthlyData?: YearlyStats['monthlyDownloads'];
    currentStats?: CurrentStats;
    yearlyStats?: Record<number, YearlyStats>;
}

export interface MonthlyDiscordStats {
    memberCount: number;
    totalMessages: number;
    uniquePosters: number;
}

export interface DiscordStats {
    stats: Record<string, MonthlyDiscordStats>;
    lastFetched: number;
}

export interface ContributorStats {
    year: number;
    unique_count: number;
    contributors: Array<{
        login: string;
        avatar_url: string;
        commits: number;
        pull_requests: number;
        contributions: number;
        repositories: Array<{
            name: string;
            commits: number;
            pull_requests: number;
            contributions: number;
            commit_timestamps: string[];
            pr_timestamps: string[];
        }>;
    }>;
    total_pull_requests: number;
    total_commits: number;
    total_contributions: number;
}

// Stake Pool Types
export interface StakePoolInfo {
    pool_id_bech32: string;
    pool_id_hex: string;
    active_epoch_no: number | null;
    vrf_key_hash: string | null;
    margin: number | null;
    fixed_cost: string | null;
    pledge: string | null;
    deposit: string | null;
    reward_addr: string | null;
    reward_addr_delegated_drep: string | null;
    owners: string[] | null;
    relays: Array<{
        dns?: string;
        dns_srv?: string;
        ipv4?: string;
        ipv6?: string;
        port?: number;
    }>;
    meta_url: string | null;
    meta_hash: string | null;
    meta_json: {
        name?: string;
        ticker?: string;
        description?: string;
        homepage?: string;
    } | null;
    pool_status: string;
    retiring_epoch: number | null;
    op_cert: string | null;
    op_cert_counter: number | null;
    active_stake: string | null;
    sigma: number | null;
    block_count: number | null;
    live_pledge: string | null;
    live_stake: string | null;
    live_delegators: number;
    live_saturation: number | null;
    voting_power: string | null;
}

export interface StakePoolData {
    poolInfo: StakePoolInfo | null;
    lastUpdated: string;
    currentEpoch: number;
}

export interface PoolHistoryRecord {
    epoch_no: number;
    active_stake: string | null;
    block_cnt: number | null;
    delegator_cnt: number | null;
    fixed_cost: string | null;
    margin: number | null;
    pledge: string | null;
    pool_fees: string | null;
    pool_rewards: string | null;
    saturation: number | null;
}

export interface PoolHistoryData {
    poolId: string;
    year: number;
    history: PoolHistoryRecord[];
    lastUpdated: string;
    currentEpoch: number;
}

export interface PoolVote {
    proposalId: string;
    proposalTxHash: string;
    proposalIndex: number;
    voteTxHash: string;
    blockTime: string;
    vote: 'Yes' | 'No' | 'Abstain';
    metaUrl: string | null;
    metaHash: string | null;
    proposalTitle: string;
    proposalType: ProposalType;
    proposedEpoch: number;
    expirationEpoch: number;
    rationale: string;
}

export interface PoolVotesData {
    poolId: string;
    year: number;
    votes: PoolVote[];
    voteCount: number;
    lastUpdated: string;
    currentEpoch: number;
}

export interface StakePoolContextData {
    poolInfo: StakePoolData | null;
    poolHistory: Record<number, PoolHistoryData>;
    poolVotes: Record<number, PoolVotesData>;
    lastFetched: number;
}

export interface DataContextType {
    orgData: OrgData | null;
    catalystData: CatalystContextData | null;
    drepVotingData: DRepVotingData | null;
    discordStats: DiscordStats | null;
    contributorStats: Record<number, ContributorStats> | null;
    contributorsData: ContributorsData | null;
    stakePoolData: StakePoolContextData | null;
    isLoading: boolean;
    error: string | null;
    refetchData: () => Promise<void>;
}

export interface OrgStatsViewProps {
    currentStats: CurrentStats;
    yearlyStats: Record<number, YearlyStats>;
    filteredStats?: FilteredStats;
    discordStats?: DiscordStats;
    contributorsData?: ContributorsData;
    contributorStats?: Record<number, ContributorStats>;
} 