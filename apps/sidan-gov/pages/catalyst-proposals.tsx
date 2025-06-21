import { useData } from '../contexts/DataContext';
import styles from "../styles/page.module.css";

export default function CatalystProposals() {
    const { catalystData, isLoading, error } = useData();

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

    const projects = catalystData?.catalystData?.projects || [];

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>Catalyst Proposals</h1>
                    <p className={styles.subtitle}>
                        Track Sidan's participation in Cardano Catalyst funding rounds
                    </p>
                </div>

                {/* Stats Section */}
                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <h3>Total Projects</h3>
                        <div className={styles.statNumber}>{projects.length}</div>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Total Budget</h3>
                        <div className={styles.statNumber}>
                            {projects.reduce((sum, project) => sum + project.projectDetails.budget, 0).toLocaleString()}
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Funds Distributed</h3>
                        <div className={styles.statNumber}>
                            {projects.reduce((sum, project) => sum + project.projectDetails.funds_distributed, 0).toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Projects Section */}
                <div className={styles.quickActions}>
                    <h2>Projects</h2>
                    <div className={styles.actionGrid}>
                        {projects.map((project, index) => (
                            <div key={index} className={styles.actionCard}>
                                <h3>{project.projectDetails.title}</h3>
                                <p><strong>Category:</strong> {project.projectDetails.category}</p>
                                <p><strong>Budget:</strong> {project.projectDetails.budget.toLocaleString()} ADA</p>
                                <p><strong>Funds Distributed:</strong> {project.projectDetails.funds_distributed.toLocaleString()} ADA</p>
                                <p><strong>Status:</strong> {project.projectDetails.status}</p>
                                <p><strong>Milestones:</strong> {project.milestonesCompleted}/{project.projectDetails.milestones_qty}</p>
                                {project.projectDetails.url && (
                                    <p><strong>URL:</strong> <a href={project.projectDetails.url} target="_blank" rel="noopener noreferrer">View Project</a></p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}