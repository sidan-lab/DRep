import path from 'path';
import fs from 'fs';
import { processYearlyStats } from './process-yearly-stats.js';
import { getConfig, getRepoRoot } from './config-loader.js';

export function generateYearlyStatsJson(year, monthlyDownloads, githubStats) {
    const processedData = processYearlyStats(year, monthlyDownloads, githubStats);
    return processedData;
}

export function saveStatsJson(statsData) {
    const config = getConfig();
    const repoRoot = getRepoRoot();
    const year = statsData.year;
    const jsonPath = path.join(repoRoot, config.outputPaths.baseDir, config.outputPaths.statsDir, `sidan-yearly-stats-${year}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(statsData, null, 2));
    console.log(`Saved stats JSON to ${jsonPath}`);
} 