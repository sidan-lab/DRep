import { NextApiRequest, NextApiResponse } from 'next';
import { getCompletedMilestones } from '../../../utils/milestones';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid project ID' });
    }

    try {
        const milestones = getCompletedMilestones(id);
        return res.status(200).json(milestones);
    } catch (error) {
        console.error('Error fetching milestones:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
} 