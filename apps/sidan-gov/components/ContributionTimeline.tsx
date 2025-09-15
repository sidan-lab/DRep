import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';
import React from 'react';

interface ContributionTimelineProps {
    commitTimestamps: string[];
    prTimestamps: string[];
    height?: number;
    showAxis?: boolean;
    globalStartDate?: string; // Optional global start date for all timelines
    globalEndDate?: string; // Optional global end date for time window selection
}

export const ContributionTimeline: React.FC<ContributionTimelineProps> = ({
    commitTimestamps,
    prTimestamps,
    height = 60,
    showAxis = false,
    globalStartDate,
    globalEndDate,
}) => {
    const data = useMemo(() => {
        // Combine and sort all timestamps
        const allTimestamps = [...commitTimestamps, ...prTimestamps].sort();
        
        if (allTimestamps.length === 0) {
            return [];
        }

        // Create a map to count contributions per day
        const contributionMap = new Map<string, { commits: number; prs: number }>();
        
        // Use global start date if provided, otherwise use the first timestamp
        const startDate = globalStartDate ? new Date(globalStartDate) : new Date(allTimestamps[0]);
        const endDate = globalEndDate ? new Date(globalEndDate) : new Date(allTimestamps[allTimestamps.length - 1]);

        // Initialize all dates in the range with zero counts
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split('T')[0];
            contributionMap.set(dateStr, { commits: 0, prs: 0 });
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Add actual contributions
        allTimestamps.forEach(timestamp => {
            const date = new Date(timestamp).toISOString().split('T')[0];
            const current = contributionMap.get(date) || { commits: 0, prs: 0 };

            if (commitTimestamps.includes(timestamp)) {
                current.commits++;
            } else {
                current.prs++;
            }

            contributionMap.set(date, current);
        });

        // Convert to array format for recharts
        const result = Array.from(contributionMap.entries()).map(([date, counts]) => ({
            date,
            commits: counts.commits,
            prs: counts.prs,
            total: counts.commits + counts.prs
        }));

        return result;
    }, [commitTimestamps, prTimestamps, globalStartDate, globalEndDate]);

    // If no data, show a placeholder
    if (data.length === 0) {
        return (
            <div style={{ 
                width: '100%', 
                height: height, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '4px',
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '12px'
            }}>
                No contribution data
            </div>
        );
    }

    return (
        <div style={{ 
            width: '100%', 
            height: height, 
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '4px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#38E8E1"
                        strokeWidth={2}
                        dot={false}
                        filter="url(#glow)"
                    />
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                    <div style={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                                        padding: '12px',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                        backdropFilter: 'blur(8px)',
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        fontSize: '0.875rem',
                                        fontFamily: 'system-ui, -apple-system, sans-serif'
                                    }}>
                                        <p style={{ margin: '0 0 8px 0', color: 'rgba(255, 255, 255, 0.7)' }}>Date: {data.date}</p>
                                        <p style={{ margin: '0 0 4px 0' }}>Commits: <span style={{ color: '#FFFFFF' }}>{data.commits}</span></p>
                                        <p style={{ margin: '0 0 4px 0' }}>PRs: <span style={{ color: '#FFFFFF' }}>{data.prs}</span></p>
                                        <p style={{ margin: '0', fontWeight: '600' }}>Total: <span style={{ color: '#FFFFFF' }}>{data.total}</span></p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ContributionTimeline; 