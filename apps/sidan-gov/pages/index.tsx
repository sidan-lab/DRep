import { useData } from '../contexts/DataContext';
import styles from "../styles/page.module.css";
import Link from 'next/link';

export default function Dashboard() {
  const { orgData, catalystData, drepVotingData, isLoading, error } = useData();

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
  const votes = drepVotingData?.votes || [];
  const projects = catalystData?.catalystData?.projects || [];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Sidan Governance</h1>
          <p className={styles.subtitle}>
            Comprehensive governance dashboard for the Sidan organization
          </p>
        </div>

        {/* Overview Stats */}
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <h3>Total Contributors</h3>
            <div className={styles.statNumber}>{currentStats?.contributors?.unique_count || 0}</div>
          </div>
          <div className={styles.statCard}>
            <h3>DRep Votes</h3>
            <div className={styles.statNumber}>{votes.length}</div>
          </div>
          <div className={styles.statCard}>
            <h3>Catalyst Projects</h3>
            <div className={styles.statNumber}>{projects.length}</div>
          </div>
          <div className={styles.statCard}>
            <h3>Total Commits</h3>
            <div className={styles.statNumber}>
              {currentStats?.contributors?.total_commits?.toLocaleString() || '0'}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <h2>Quick Actions</h2>
          <div className={styles.actionGrid}>
            <Link href="/drep-voting" className={styles.actionCard}>
              <h3>DRep Voting</h3>
              <p>Track Sidan&apos;s DRep voting activity and delegation information</p>
            </Link>
            <Link href="/catalyst-proposals" className={styles.actionCard}>
              <h3>Catalyst Proposals</h3>
              <p>View Sidan&apos;s participation in Cardano Catalyst funding rounds</p>
            </Link>
            <Link href="/sidan-stats" className={styles.actionCard}>
              <h3>Sidan Stats</h3>
              <p>Comprehensive statistics and metrics for the organization</p>
            </Link>
            <Link href="/projects" className={styles.actionCard}>
              <h3>Projects</h3>
              <p>Explore Sidan&apos;s open source projects and repositories</p>
            </Link>
            <Link href="/contributors" className={styles.actionCard}>
              <h3>Contributors</h3>
              <p>Meet the amazing contributors who make Sidan possible</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.quickActions}>
          <h2>Recent Activity</h2>
          <div className={styles.actionGrid}>
            {votes.slice(0, 3).map((vote, index) => (
              <div key={index} className={styles.actionCard}>
                <h3>Recent Vote</h3>
                <p><strong>Proposal:</strong> {vote.proposalTitle || `Proposal ${vote.proposalId}`}</p>
                <p><strong>Vote:</strong> {vote.vote}</p>
                <p><strong>Date:</strong> {new Date(vote.blockTime).toLocaleDateString()}</p>
              </div>
            ))}
            {projects.slice(0, 3).map((project, index) => (
              <div key={`project-${index}`} className={styles.actionCard}>
                <h3>Catalyst Project</h3>
                <p><strong>Title:</strong> {project.projectDetails.title}</p>
                <p><strong>Status:</strong> {project.projectDetails.status}</p>
                <p><strong>Budget:</strong> {project.projectDetails.budget.toLocaleString()} ADA</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 