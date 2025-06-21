import { useData } from '../contexts/DataContext';
import styles from "../styles/page.module.css";

export default function SidanStats() {
    const { orgData, isLoading, error } = useData();

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

    const currentStats = orgData?.currentStats;
    const yearlyStats = orgData?.yearlyStats;

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>Sidan Stats</h1>
                    <p className={styles.subtitle}>
                        Comprehensive statistics and metrics for Sidan organization
                    </p>
                </div>

                {/* Current Stats Section */}
                {currentStats && (
                    <>
                        <div className={styles.stats}>
                            <div className={styles.statCard}>
                                <h3>Total Contributors</h3>
                                <div className={styles.statNumber}>{currentStats.contributors.unique_count}</div>
                            </div>
                            <div className={styles.statCard}>
                                <h3>Total Commits</h3>
                                <div className={styles.statNumber}>{currentStats.contributors.total_commits.toLocaleString()}</div>
                            </div>
                            <div className={styles.statCard}>
                                <h3>Total Pull Requests</h3>
                                <div className={styles.statNumber}>{currentStats.contributors.total_pull_requests.toLocaleString()}</div>
                            </div>
                        </div>

                        {/* NPM Stats */}
                        <div className={styles.quickActions}>
                            <h2>NPM Package Downloads</h2>
                            <div className={styles.actionGrid}>
                                <div className={styles.actionCard}>
                                    <h3>Core Package</h3>
                                    <p><strong>Last 12 Months:</strong> {currentStats.npm.downloads.core_package_last_12_months.toLocaleString()}</p>
                                    <p><strong>Last Day:</strong> {currentStats.npm.downloads.last_day.toLocaleString()}</p>
                                    <p><strong>Last Week:</strong> {currentStats.npm.downloads.last_week.toLocaleString()}</p>
                                    <p><strong>Last Month:</strong> {currentStats.npm.downloads.last_month.toLocaleString()}</p>
                                </div>
                                <div className={styles.actionCard}>
                                    <h3>React Package</h3>
                                    <p><strong>Downloads:</strong> {currentStats.npm.react_package_downloads.toLocaleString()}</p>
                                </div>
                                <div className={styles.actionCard}>
                                    <h3>Transaction Package</h3>
                                    <p><strong>Downloads:</strong> {currentStats.npm.transaction_package_downloads.toLocaleString()}</p>
                                </div>
                                <div className={styles.actionCard}>
                                    <h3>Wallet Package</h3>
                                    <p><strong>Downloads:</strong> {currentStats.npm.wallet_package_downloads.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* GitHub Stats */}
                        <div className={styles.quickActions}>
                            <h2>GitHub Usage</h2>
                            <div className={styles.actionGrid}>
                                <div className={styles.actionCard}>
                                    <h3>Core Package Usage</h3>
                                    <p><strong>In package.json:</strong> {currentStats.github.core_in_package_json.toLocaleString()}</p>
                                    <p><strong>In any file:</strong> {currentStats.github.core_in_any_file.toLocaleString()}</p>
                                    <p><strong>In repositories:</strong> {currentStats.github.core_in_repositories.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Yearly Stats */}
                {yearlyStats && Object.keys(yearlyStats).length > 0 && (
                    <div className={styles.quickActions}>
                        <h2>Yearly Statistics</h2>
                        <div className={styles.actionGrid}>
                            {Object.entries(yearlyStats).map(([year, stats]) => (
                                <div key={year} className={styles.actionCard}>
                                    <h3>Year {year}</h3>
                                    <p><strong>Core Downloads:</strong> {stats.yearlyTotals.core.toLocaleString()}</p>
                                    <p><strong>React Downloads:</strong> {stats.yearlyTotals.react.toLocaleString()}</p>
                                    <p><strong>Transaction Downloads:</strong> {stats.yearlyTotals.transaction.toLocaleString()}</p>
                                    <p><strong>Wallet Downloads:</strong> {stats.yearlyTotals.wallet.toLocaleString()}</p>
                                    <p><strong>Peak Month:</strong> {stats.peakMonth.name} ({stats.peakMonth.downloads.toLocaleString()})</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
} 