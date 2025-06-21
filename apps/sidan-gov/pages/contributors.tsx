import { useData } from '../contexts/DataContext';
import styles from "../styles/page.module.css";
import Image from 'next/image';

export default function Contributors() {
    const { orgData, contributorsData, contributorStats, isLoading, error } = useData();

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>Error: {error}</div>
            </div>
        );
    }

    const currentContributors = orgData?.currentStats?.contributors?.contributors || [];
    const allContributors = contributorsData?.contributors || [];
    const yearlyContributorStats = contributorStats || {};

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>Contributors</h1>
                    <p className={styles.subtitle}>
                        Meet the amazing contributors who make Sidan possible
                    </p>
                </div>

                {/* Stats Section */}
                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <h3>Total Contributors</h3>
                        <div className={styles.statNumber}>{allContributors.length}</div>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Total Commits</h3>
                        <div className={styles.statNumber}>
                            {allContributors.reduce((sum, contributor) => sum + contributor.commits, 0).toLocaleString()}
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Total Pull Requests</h3>
                        <div className={styles.statNumber}>
                            {allContributors.reduce((sum, contributor) => sum + contributor.pull_requests, 0).toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Top Contributors Section */}
                <div className={styles.quickActions}>
                    <h2>Top Contributors</h2>
                    <div className={styles.actionGrid}>
                        {allContributors
                            .sort((a, b) => b.contributions - a.contributions)
                            .slice(0, 12)
                            .map((contributor, index) => (
                                <div key={index} className={styles.actionCard}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                        <Image
                                            src={contributor.avatar_url}
                                            alt={contributor.login}
                                            width={40}
                                            height={40}
                                            style={{ borderRadius: '50%', marginRight: '12px' }}
                                        />
                                        <h3 style={{ margin: 0 }}>{contributor.login}</h3>
                                    </div>
                                    <p><strong>Commits:</strong> {contributor.commits.toLocaleString()}</p>
                                    <p><strong>Pull Requests:</strong> {contributor.pull_requests.toLocaleString()}</p>
                                    <p><strong>Total Contributions:</strong> {contributor.contributions.toLocaleString()}</p>
                                    <p><strong>Repositories:</strong> {contributor.repositories.length}</p>
                                    <p><strong>GitHub:</strong> <a href={`https://github.com/${contributor.login}`} target="_blank" rel="noopener noreferrer">View Profile</a></p>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Yearly Contributor Stats */}
                {Object.keys(yearlyContributorStats).length > 0 && (
                    <div className={styles.quickActions}>
                        <h2>Yearly Contributor Statistics</h2>
                        <div className={styles.actionGrid}>
                            {Object.entries(yearlyContributorStats)
                                .sort(([a], [b]) => parseInt(b) - parseInt(a))
                                .map(([year, stats]) => (
                                    <div key={year} className={styles.actionCard}>
                                        <h3>Year {year}</h3>
                                        <p><strong>Unique Contributors:</strong> {stats.unique_count}</p>
                                        <p><strong>Total Commits:</strong> {stats.total_commits.toLocaleString()}</p>
                                        <p><strong>Total Pull Requests:</strong> {stats.total_pull_requests.toLocaleString()}</p>
                                        <p><strong>Total Contributions:</strong> {stats.total_contributions.toLocaleString()}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {/* Repository Contributions */}
                {currentContributors.length > 0 && (
                    <div className={styles.quickActions}>
                        <h2>Repository Contributions</h2>
                        <div className={styles.actionGrid}>
                            {currentContributors
                                .flatMap(contributor => contributor.repositories)
                                .reduce((acc, repo) => {
                                    const existing = acc.find(r => r.name === repo.name);
                                    if (existing) {
                                        existing.commits += repo.commits;
                                        existing.pull_requests += repo.pull_requests;
                                        existing.contributions += repo.contributions;
                                    } else {
                                        acc.push({ ...repo });
                                    }
                                    return acc;
                                }, [] as Array<{ name: string; commits: number; pull_requests: number; contributions: number }>)
                                .sort((a, b) => b.contributions - a.contributions)
                                .slice(0, 8)
                                .map((repo, index) => (
                                    <div key={index} className={styles.actionCard}>
                                        <h3>{repo.name}</h3>
                                        <p><strong>Commits:</strong> {repo.commits.toLocaleString()}</p>
                                        <p><strong>Pull Requests:</strong> {repo.pull_requests.toLocaleString()}</p>
                                        <p><strong>Total Contributions:</strong> {repo.contributions.toLocaleString()}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
} 