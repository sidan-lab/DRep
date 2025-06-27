import fs from 'fs';
import path from 'path';

let config = null;

export function getRepoRoot() {
    // Get the repository root directory (2 levels up from scripts/sidan-gov directory)
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