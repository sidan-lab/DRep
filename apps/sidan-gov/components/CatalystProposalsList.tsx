import { FC } from 'react';
import styles from '../styles/Proposals.module.css';
import { CatalystData } from '../types';
import { useRouter } from 'next/router';

// Simple number formatting function that doesn't rely on locale settings
const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Format ADA amount with symbol
const formatAda = (amount: number): string => {
    return `₳ ${formatNumber(amount)}`;
};

// Calculate progress percentage safely
const calculateProgress = (completed: number, total: number): number => {
    if (!total) return 0;
    return Math.round((completed / total) * 100);
};

// Generate progress bar color based on completion percentage
const getProgressBarColor = (progressPercent: number): string => {
    if (progressPercent === 100) {
        return 'linear-gradient(90deg, #38E8E1, #4AEBDE)';
    }
    
    // Create a smooth transition from barely visible white to SIDAN blue
    const blueIntensity = progressPercent / 100;
    const whiteIntensity = 1 - blueIntensity;
    
    // Start color: mix of white and blue based on progress
    const startR = Math.round(255 * whiteIntensity + 56 * blueIntensity);
    const startG = Math.round(255 * whiteIntensity + 232 * blueIntensity);
    const startB = Math.round(255 * whiteIntensity + 225 * blueIntensity);
    const startAlpha = 0.08 + (0.92 * blueIntensity);
    
    // End color: slightly brighter version
    const endR = Math.round(255 * whiteIntensity + 74 * blueIntensity);
    const endG = Math.round(255 * whiteIntensity + 235 * blueIntensity);
    const endB = Math.round(255 * whiteIntensity + 222 * blueIntensity);
    const endAlpha = 0.15 + (0.85 * blueIntensity);
    
    return `linear-gradient(90deg, rgba(${startR}, ${startG}, ${startB}, ${startAlpha}), rgba(${endR}, ${endG}, ${endB}, ${endAlpha}))`;
};

// Get funding round from category (first 3 characters)
const getFundingRound = (category: string): string => {
    const match = category.match(/Fund \d+/i);
    return match ? match[0] : category;
};

interface CatalystProposalsListProps {
    data: CatalystData;
}

const CatalystProposalsList: FC<CatalystProposalsListProps> = ({ data }) => {
    const router = useRouter();

    // Format the timestamp consistently using UTC to avoid timezone issues
    const formatDate = (timestamp: string): string => {
        const date = new Date(timestamp);
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        const year = date.getUTCFullYear();
        const hours = date.getUTCHours() % 12 || 12;
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const ampm = date.getUTCHours() >= 12 ? 'PM' : 'AM';

        return `${month}/${day}/${year}, ${hours}:${minutes} ${ampm} UTC`;
    };

    const handleCardClick = (projectId: number) => {
        router.push(`/catalyst-proposals/${projectId}`);
    };

    return (
        <>
            <div className={styles.milestoneOverview}>
                <h3 className={styles.milestoneOverviewTitle}>Project Milestones Progress</h3>
                <div className={styles.milestoneGrid}>
                    {data.projects.map((project) => {
                        const progressPercent = calculateProgress(project.milestonesCompleted, project.projectDetails.milestones_qty);
                        return (
                            <a
                                key={project.projectDetails.id}
                                className={styles.milestoneRow}
                                onClick={() => handleCardClick(project.projectDetails.project_id)}
                                style={{ cursor: 'pointer' }}
                                data-tooltip={project.projectDetails.title}
                            >
                                <div className={styles.milestoneInfo}>
                                    <div className={styles.milestoneTitle}>
                                        <span className={styles.fundTag}>{getFundingRound(project.projectDetails.category)}</span>
                                        <span className={styles.projectTitle}>
                                            {project.projectDetails.title}
                                        </span>
                                    </div>
                                    <div className={styles.milestoneCount}>
                                        {project.milestonesCompleted ?? 0}/{project.projectDetails.milestones_qty}
                                    </div>
                                </div>
                                <div className={styles.milestoneProgressBar}>
                                    <div
                                        className={styles.milestoneProgressFill}
                                        style={{
                                            width: `${progressPercent}%`,
                                            background: getProgressBarColor(progressPercent)
                                        }}
                                    />
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>

            <ul className={styles.list}>
                {data.projects.map((project) => {
                    const progressPercent = calculateProgress(project.milestonesCompleted, project.projectDetails.milestones_qty);

                    return (
                        <li
                            key={project.projectDetails.id}
                            className={`${styles.card} ${styles.clickable}`}
                            data-testid="proposal-item"
                            onClick={() => handleCardClick(project.projectDetails.project_id)}
                        >
                            <div className={styles.cardInner}>
                                <div className={styles.cardHeader}>
                                    <span className={`${styles.status} ${
                                        progressPercent === 100 ? styles.statusCompleted :
                                        project.projectDetails.status === 'In Progress' ? styles.statusInProgress :
                                            styles.statusPending
                                        }`}>
                                        {progressPercent === 100 ? 'Completed' : project.projectDetails.status}
                                    </span>
                                    <h3 className={styles.title}>{project.projectDetails.title}</h3>
                                </div>

                                <div className={styles.cardContent}>
                                    <div className={styles.infoGrid}>
                                        <div className={styles.infoBox}>
                                            <span className={styles.infoLabel}>Fund</span>
                                            <span className={styles.infoValue}>{getFundingRound(project.projectDetails.category)}</span>
                                        </div>

                                        <div className={styles.infoBox}>
                                            <span className={styles.infoLabel}>Budget</span>
                                            <span className={styles.infoValue}>{formatAda(project.projectDetails.budget)}</span>
                                        </div>

                                        <div className={styles.infoBox}>
                                            <span className={styles.infoLabel}>Distributed</span>
                                            <span className={styles.infoValue}>{formatAda(project.projectDetails.funds_distributed)}</span>
                                        </div>

                                        <div className={styles.infoBox}>
                                            <span className={styles.infoLabel}>Milestones</span>
                                            <span className={styles.infoValue}>
                                                {project.milestonesCompleted ?? 0}/{project.projectDetails.milestones_qty}
                                            </span>
                                            <div className={styles.progressBar}>
                                                <div
                                                    className={styles.progressFill}
                                                    style={{
                                                        width: `${progressPercent}%`,
                                                        background: getProgressBarColor(progressPercent)
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.infoBox}>
                                            <span className={styles.infoLabel}>Yes Votes</span>
                                            <span className={styles.infoValue}>{formatAda(project.projectDetails.voting.yes_votes_count)}</span>
                                        </div>

                                        <div className={styles.infoBox}>
                                            <span className={styles.infoLabel}>Unique Voters</span>
                                            <span className={styles.infoValue}>{project.projectDetails.voting.unique_wallets}</span>
                                        </div>
                                        
                                    </div>

                                    <div className={styles.projectIdBox}>
                                        <span className={styles.projectIdLabel}>Project ID</span>
                                        <span className={styles.projectIdValue}>{project.projectDetails.project_id}</span>
                                    </div>
                                </div>

                                <div className={styles.cardActions}>
                                    <button
                                        className={styles.actionButton}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCardClick(project.projectDetails.project_id);
                                        }}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div className={styles.timestamp}>
                Last updated: {formatDate(data.timestamp)}
            </div>
        </>
    );
};

export default CatalystProposalsList; 