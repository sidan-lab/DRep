import fs from 'fs';
import path from 'path';

export interface MilestoneData {
    projectId: string;
    milestoneNumber: number;
    link: string;
    challenge: string;
    budget: string;
    deliveredDate: string;
    title: string;
    content: string;
    outcomes: string[];
    evidence: string[];
}

export interface ParsedMilestoneHeader {
    projectId: string;
    link: string;
    milestone: string;
    challenge: string;
    budget: string;
    delivered: string;
}

function parseMilestoneHeader(content: string): ParsedMilestoneHeader | null {
    const lines = content.split('\n');
    const header: any = {};
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('|') && !line.startsWith('|---')) {
            const parts = line.split('|').map(part => part.trim()).filter(part => part);
            if (parts.length === 2) {
                const key = parts[0].toLowerCase().replace(' ', '');
                header[key] = parts[1];
            }
        }
        // Stop parsing header when we reach the markdown title
        if (line.startsWith('#')) {
            break;
        }
    }
    
    return {
        projectId: header.projectid || '',
        link: header.link || '',
        milestone: header.milestone || '',
        challenge: header.challenge || '',
        budget: header.milestonebudget || header.budget || '',
        delivered: header.milestonedelivered || header.delivered || ''
    };
}

function extractMilestoneContent(content: string): { title: string; content: string; outcomes: string[]; evidence: string[] } {
    const lines = content.split('\n');
    let title = '';
    let contentStartIndex = 0;
    let outcomes: string[] = [];
    let evidence: string[] = [];
    
    // Find the main title (first # heading after the header table)
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('#') && !line.startsWith('##')) {
            title = line.replace(/^#+\s*/, '');
            contentStartIndex = i + 1;
            break;
        }
    }
    
    // Extract content and look for outcomes/evidence
    const contentLines = lines.slice(contentStartIndex);
    let currentSection = '';
    
    for (const line of contentLines) {
        const trimmedLine = line.trim();
        
        // Check for section headers
        if (trimmedLine.toLowerCase().includes('outcome') || 
            trimmedLine.toLowerCase().includes('acceptance criteria') ||
            trimmedLine.toLowerCase().includes('milestone outcomes')) {
            currentSection = 'outcomes';
            continue;
        }
        
        if (trimmedLine.toLowerCase().includes('evidence') || 
            trimmedLine.toLowerCase().includes('completion') ||
            trimmedLine.toLowerCase().includes('deliverable')) {
            currentSection = 'evidence';
            continue;
        }
        
        // Extract bullet points or numbered items
        if (trimmedLine.startsWith('-') || trimmedLine.startsWith('*') || /^\d+\./.test(trimmedLine)) {
            const item = trimmedLine.replace(/^[-*\d.]\s*/, '');
            if (currentSection === 'outcomes') {
                outcomes.push(item);
            } else if (currentSection === 'evidence') {
                evidence.push(item);
            }
        }
        
        // Extract links from evidence
        if (trimmedLine.includes('http') && currentSection === 'evidence') {
            const urlMatch = trimmedLine.match(/https?:\/\/[^\s\)]+/);
            if (urlMatch) {
                evidence.push(urlMatch[0]);
            }
        }
    }
    
    return {
        title,
        content: contentLines.join('\n'),
        outcomes,
        evidence
    };
}

export function getMilestoneNumber(filename: string): number {
    const match = filename.match(/milestone(\d+)/i);
    return match ? parseInt(match[1], 10) : 0;
}

export function getCompletedMilestones(projectId: string): MilestoneData[] {
    try {
        // Try different possible paths for catalyst-proposals directory
        const possiblePaths = [
            path.join(process.cwd(), 'catalyst-proposals'),           // If running from project root
            path.join(process.cwd(), '..', '..', 'catalyst-proposals'), // If running from apps/sidan-gov
            path.join(process.cwd(), '..', 'catalyst-proposals'),       // Alternative path
        ];
        
        let catalystProposalsPath = '';
        for (const testPath of possiblePaths) {
            if (fs.existsSync(testPath)) {
                catalystProposalsPath = testPath;
                break;
            }
        }
        
        if (!catalystProposalsPath) {
            return [];
        }
        
        const milestones: MilestoneData[] = [];
        
        // Search through all fund directories
        const fundDirs = fs.readdirSync(catalystProposalsPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        
        for (const fundDir of fundDirs) {
            const fundPath = path.join(catalystProposalsPath, fundDir);
            
            const projectDirs = fs.readdirSync(fundPath, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);
            
            for (const projectDir of projectDirs) {
                // Check if this project directory contains our target project
                if (projectDir.includes(projectId)) {
                    const projectPath = path.join(fundPath, projectDir);
                    const files = fs.readdirSync(projectPath);
                    
                    // Find all milestone files
                    const milestoneFiles = files
                        .filter(file => file.includes('milestone') && file.endsWith('.md'))
                        .sort((a, b) => getMilestoneNumber(a) - getMilestoneNumber(b));
                    
                    for (const file of milestoneFiles) {
                        const filePath = path.join(projectPath, file);
                        const content = fs.readFileSync(filePath, 'utf-8');
                        const header = parseMilestoneHeader(content);
                        const { title, content: milestoneContent, outcomes, evidence } = extractMilestoneContent(content);
                        
                        if (header) {
                            milestones.push({
                                projectId: header.projectId,
                                milestoneNumber: getMilestoneNumber(file),
                                link: header.link,
                                challenge: header.challenge,
                                budget: header.budget,
                                deliveredDate: header.delivered,
                                title,
                                content: milestoneContent,
                                outcomes,
                                evidence
                            });
                        }
                    }
                    
                    break; // Found the project, no need to continue searching
                }
            }
        }
        
        return milestones;
    } catch (error) {
        console.error('Error reading milestone data:', error);
        return [];
    }
} 