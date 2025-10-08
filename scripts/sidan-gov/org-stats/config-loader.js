import fs from 'fs';
import path from 'path';

let config = null;

export function getRepoRoot() {
    // Get the repository root directory
    // When running from scripts/sidan-gov/discord-stats, we need to go up 3 levels
    // When running from scripts/sidan-gov, we need to go up 2 levels
    const currentDir = process.cwd();
    
    // Check if we're in a subdirectory of scripts/sidan-gov
    if (currentDir.includes('scripts/sidan-gov')) {
        // Find the scripts/sidan-gov directory and go up 2 levels from there
        const scriptsSidanGovIndex = currentDir.indexOf('scripts/sidan-gov');
        const scriptsSidanGovPath = currentDir.substring(0, scriptsSidanGovIndex + 'scripts/sidan-gov'.length);
        return path.resolve(scriptsSidanGovPath, '..', '..');
    }
    
    // Fallback: try going up 2 levels (for scripts/sidan-gov)
    return path.resolve(process.cwd(), '..', '..');
}

export function loadConfig() {
    if (config) {
        return config;
    }

    // Try to find the config file in the root of the repository
    const repoRoot = getRepoRoot();
    const possiblePaths = [
        path.join(process.cwd(), 'org-stats-config.json'),
        path.join(process.cwd(), '..', 'org-stats-config.json'),
        path.join(process.cwd(), '..', '..', 'org-stats-config.json'),
        path.join(process.cwd(), '..', '..', '..', 'org-stats-config.json'),
        path.join(repoRoot, 'org-stats-config.json')
    ];

    let configPath = null;
    for (const possiblePath of possiblePaths) {
        if (fs.existsSync(possiblePath)) {
            configPath = possiblePath;
            break;
        }
    }

    if (!configPath) {
        throw new Error('Could not find org-stats-config.json in any of the expected locations');
    }

    try {
        const configContent = fs.readFileSync(configPath, 'utf8');
        config = JSON.parse(configContent);

        // Validate required fields
        if (!config.organization?.name) {
            throw new Error('Config must contain organization.name');
        }

        console.log(`Loaded config from: ${configPath}`);
        console.log(`Organization: ${config.organization.name}`);

        return config;
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error(`Invalid JSON in config file: ${error.message}`);
        }
        throw error;
    }
}

export function getConfig() {
    return loadConfig();
} 