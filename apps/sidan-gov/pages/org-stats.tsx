import OrgStatsView from '../components/OrgStatsView';
import { useData } from '../contexts/DataContext';
import styles from '../styles/OrgStats.module.css';
import { useMemo } from 'react';
import PageHeader from '../components/PageHeader';

export default function MeshStatsPage() {
    const { orgData, discordStats, contributorsData, contributorStats, isLoading, error } = useData();

    // Version subtitle for PageHeader
    const versionSubtitle = useMemo(() => {
        return orgData?.currentStats?.npm?.latest_version
            ? `Latest Version: ${orgData.currentStats.npm.latest_version}`
            : undefined;
    }, [orgData]);

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.stat}>
                    <p>Loading mesh statistics...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.stat}>
                    <p className={styles.error}>{error}</p>
                </div>
            </div>
        );
    }

    if (!orgData?.currentStats || !orgData?.yearlyStats || Object.keys(orgData.yearlyStats).length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.stat}>
                    <p>No mesh statistics available</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <PageHeader
                title={<>Mesh SDK <span>Statistics</span></>}
                subtitle={versionSubtitle}
            />

            <OrgStatsView
                currentStats={orgData.currentStats}
                yearlyStats={orgData.yearlyStats}
                discordStats={discordStats || undefined}
                contributorsData={contributorsData?.unique_count ? contributorsData : undefined}
                contributorStats={contributorStats || undefined}
            />
        </div>
    );
} 