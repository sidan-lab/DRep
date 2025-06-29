import { NextApiRequest, NextApiResponse } from 'next';
import config from '../../../config';

// Get configuration values
const ORGANIZATION_NAME = config.organization.name;
const GOVERNANCE_REPO = config.repositories.governance;
const BASE_URL = `https://raw.githubusercontent.com/${ORGANIZATION_NAME}/${GOVERNANCE_REPO}/main/${config.outputPaths.baseDir}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid project ID' });
    }

    try {
        // Fetch milestones data from GitHub
        const response = await fetch(`${BASE_URL}/${config.outputPaths.catalystProposalsDir}/milestones-data.json`);
        
        if (!response.ok) {
            console.error('Failed to fetch milestones data:', response.status, response.statusText);
            return res.status(500).json({ message: 'Failed to fetch milestones data' });
        }
        
        const data = await response.json();
        const milestones = data.milestones[id] || [];
        
        return res.status(200).json(milestones);
    } catch (error) {
        console.error('Error fetching milestones:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
} 