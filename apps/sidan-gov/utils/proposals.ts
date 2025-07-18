export interface ProposalDetails {
    projectId: string;
    name: string;
    link: string;
    milestonesLink: string;
    fundingCategory: string;
    proposalBudget: string;
    status: string;
    milestonesCompleted: string;
    fundsDistributed: string;
    fundingProgress: string;
    finished?: string;
    description?: string;
}

export const PROPOSAL_OBJECTIVES: Record<string, string> = {
    '1100257': 'Hosting a series of events, both technical and non-technical in Hong Kong to spin up the community, enhancing ecosystem engagement and exposure.'
};

export async function getProposalDetails(projectId: string): Promise<ProposalDetails | null> {
    try {
        const response = await fetch(`/api/proposals/${projectId}`);
        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error('Failed to fetch proposal details');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching proposal details:', error);
        return null;
    }
} 