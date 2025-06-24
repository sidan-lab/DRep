import fs from 'fs';
import path from 'path';
import { getConfig, getRepoRoot } from './config-loader.js';

export function saveJson(stats) {
    const config = getConfig();
    const repoRoot = getRepoRoot();
    const jsonDir = path.join(repoRoot, config.outputPaths.baseDir, config.outputPaths.statsDir);
    const jsonPath = path.join(jsonDir, 'sidan_stats.json');

    // Create directory if it doesn't exist
    if (!fs.existsSync(jsonDir)) {
        fs.mkdirSync(jsonDir, { recursive: true });
    }

    fs.writeFileSync(jsonPath, JSON.stringify(stats, null, 2));
    console.log(`Saved JSON to ${jsonPath}`);
} 