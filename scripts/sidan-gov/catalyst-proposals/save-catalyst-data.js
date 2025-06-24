import fs from 'fs';
import path from 'path';
import { getConfig, getRepoRoot } from '../org-stats/config-loader.js';

const config = getConfig();
// Get the repository root directory using the utility function
const repoRoot = getRepoRoot();
const DATA_DIR = path.join(repoRoot, config.outputPaths.baseDir, config.outputPaths.catalystProposalsDir);

/**
 * Saves the catalyst data to a JSON file
 * @param {Array} projects - Array of project data
 */
export async function saveCatalystData(projects) {
    // Debug output for paths
    console.log('DEBUG: process.cwd() =', process.cwd());
    console.log('DEBUG: repoRoot =', repoRoot);
    console.log('DEBUG: DATA_DIR =', DATA_DIR);
    console.log('DEBUG: config.outputPaths.baseDir =', config.outputPaths.baseDir);
    console.log('DEBUG: config.outputPaths.catalystProposalsDir =', config.outputPaths.catalystProposalsDir);

    // Ensure the directory exists
    if (!fs.existsSync(DATA_DIR)) {
        console.log('DEBUG: Creating directory:', DATA_DIR);
        fs.mkdirSync(DATA_DIR, { recursive: true });
    } else {
        console.log('DEBUG: Directory already exists:', DATA_DIR);
    }

    // Get current timestamp for filename
    const now = new Date();
    const filePath = path.join(DATA_DIR, `catalyst-data.json`);
    console.log('DEBUG: filePath =', filePath);

    // Prepare the data structure
    const data = {
        timestamp: now.toISOString(),
        projects: projects.map(project => ({
            projectDetails: project.projectDetails,
            milestonesCompleted: project.milestonesCompleted
        }))
    };

    // Write the data to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Saved catalyst data to ${filePath}`);

    // Verify the file was created
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        console.log(`DEBUG: File created successfully. Size: ${stats.size} bytes`);
    } else {
        console.log('DEBUG: ERROR - File was not created!');
    }
}