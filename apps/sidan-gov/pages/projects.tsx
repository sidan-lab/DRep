import { useData } from '../contexts/DataContext';
import styles from "../styles/page.module.css";

export default function Projects() {
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
    const contributors = currentStats?.contributors?.contributors || [];

    // Extract unique repositories from contributors
    const allRepositories = contributors.flatMap(contributor =>
        contributor.repositories.map(repo => ({
            name: repo.name,
            commits: repo.commits,
            pull_requests: repo.pull_requests,
            contributions: repo.contributions
        }))
    );

    // Group repositories by name and sum their stats
    const repositoryStats = allRepositories.reduce((acc, repo) => {
        if (acc[repo.name]) {
            acc[repo.name].commits += repo.commits;
            acc[repo.name].pull_requests += repo.pull_requests;
            acc[repo.name].contributions += repo.contributions;
        } else {
            acc[repo.name] = { ...repo };
        }
        return acc;
    }, {} as Record<string, { name: string; commits: number; pull_requests: number; contributions: number }>);

    const repositories = Object.values(repositoryStats).sort((a, b) => b.contributions - a.contributions);

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>Projects</h1>
                    <p className={styles.subtitle}>
                        Explore Sidan's open source projects and repositories
                    </p>
                </div>

                {/* Stats Section */}
                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <h3>Total Repositories</h3>
                        <div className={styles.statNumber}>{repositories.length}</div>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Total Commits</h3>
                        <div className={styles.statNumber}>
                            {repositories.reduce((sum, repo) => sum + repo.commits, 0).toLocaleString()}
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Total Pull Requests</h3>
                        <div className={styles.statNumber}>
                            {repositories.reduce((sum, repo) => sum + repo.pull_requests, 0).toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Repositories Section */}
                <div className={styles.quickActions}>
                    <h2>Repositories</h2>
                    <div className={styles.actionGrid}>
                        {repositories.map((repo, index) => (
                            <div key={index} className={styles.actionCard}>
                                <h3>{repo.name}</h3>
                                <p><strong>Commits:</strong> {repo.commits.toLocaleString()}</p>
                                <p><strong>Pull Requests:</strong> {repo.pull_requests.toLocaleString()}</p>
                                <p><strong>Total Contributions:</strong> {repo.contributions.toLocaleString()}</p>
                                <p><strong>GitHub:</strong> <a href={`https://github.com/Sidan-DRep/${repo.name}`} target="_blank" rel="noopener noreferrer">View Repository</a></p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Package Information */}
                {currentStats && (
                    <div className={styles.quickActions}>
                        <h2>NPM Packages</h2>
                        <div className={styles.actionGrid}>
                            <div className={styles.actionCard}>
                                <h3>Core Package</h3>
                                <p><strong>Latest Version:</strong> {currentStats.npm.latest_version}</p>
                                <p><strong>Dependents:</strong> {currentStats.npm.dependents_count.toLocaleString()}</p>
                                <p><strong>Downloads (12 months):</strong> {currentStats.npm.downloads.core_package_last_12_months.toLocaleString()}</p>
                                <p><strong>NPM:</strong> <a href="https://www.npmjs.com/package/@meshsdk/core" target="_blank" rel="noopener noreferrer">View Package</a></p>
                            </div>
                            <div className={styles.actionCard}>
                                <h3>React Package</h3>
                                <p><strong>Downloads:</strong> {currentStats.npm.react_package_downloads.toLocaleString()}</p>
                                <p><strong>NPM:</strong> <a href="https://www.npmjs.com/package/@meshsdk/react" target="_blank" rel="noopener noreferrer">View Package</a></p>
                            </div>
                            <div className={styles.actionCard}>
                                <h3>Transaction Package</h3>
                                <p><strong>Downloads:</strong> {currentStats.npm.transaction_package_downloads.toLocaleString()}</p>
                                <p><strong>NPM:</strong> <a href="https://www.npmjs.com/package/@meshsdk/transaction" target="_blank" rel="noopener noreferrer">View Package</a></p>
                            </div>
                            <div className={styles.actionCard}>
                                <h3>Wallet Package</h3>
                                <p><strong>Downloads:</strong> {currentStats.npm.wallet_package_downloads.toLocaleString()}</p>
                                <p><strong>NPM:</strong> <a href="https://www.npmjs.com/package/@meshsdk/wallet" target="_blank" rel="noopener noreferrer">View Package</a></p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
} 