// Frontend configuration that imports the main org-stats-config.json
import config from '../../org-stats-config.json';

// Type definitions for the config
interface BuilderProject {
    id: string;
    icon: string;
    url: string;
}

interface HighlightedProject {
    id: string;
    name: string;
    description: string;
    icon: string;
    url: string;
    category?: string;
}

interface ShowcaseRepo {
    name: string;
    description: string;
    icon: string;
    url: string;
}

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
        stakePoolDir: string;
    };
    githubUrls: {
        dependentsUrl: string;
    };
    builderProjects: BuilderProject[];
    highlightedProjects: HighlightedProject[];
    showcaseRepos: ShowcaseRepo[];
    drepId: string;
}

export default config as OrgStatsConfig; 