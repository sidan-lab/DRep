// Frontend configuration that imports the main org-stats-config.json
import config from '../../org-stats-config.json';

// Type definitions for the config
interface OrgStatsConfig {
    organization: {
        name: string;
        displayName: string;
    };
    repositories: {
        main: string;
        governance: string;
        dependentsCountRepo: string;
    };
    npmPackages: {
        [key: string]: string;
    };
    outputPaths: {
        baseDir: string;
        statsDir: string;
        contributionsDir: string;
        drepVotingDir: string;
        catalystProposalsDir: string;
        discordStatsDir: string;
    };
    githubUrls: {
        dependentsUrl: string;
    };
    drepId: string;
}

export default config as OrgStatsConfig; 