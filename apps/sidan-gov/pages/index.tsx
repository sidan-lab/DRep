import styles from "../styles/page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Welcome to Sidan Governance</h1>
          <p className={styles.subtitle}>
            Decentralized Representative (DRep) voting platform for the Cardano ecosystem
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <h3>Active Proposals</h3>
            <p className={styles.statNumber}>12</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Votes Cast</h3>
            <p className={styles.statNumber}>1,247</p>
          </div>
          <div className={styles.statCard}>
            <h3>Community Members</h3>
            <p className={styles.statNumber}>89</p>
          </div>
        </div>

        <div className={styles.quickActions}>
          <h2>Quick Actions</h2>
          <div className={styles.actionGrid}>
            <a href="/drep-voting" className={styles.actionCard}>
              <h3>DRep Voting</h3>
              <p>Participate in decentralized governance decisions</p>
            </a>
            <a href="/catalyst-proposals" className={styles.actionCard}>
              <h3>Catalyst Proposals</h3>
              <p>Review and vote on Project Catalyst proposals</p>
            </a>
            <a href="/voting-history" className={styles.actionCard}>
              <h3>Voting History</h3>
              <p>View past voting decisions and rationales</p>
            </a>
            <a href="/projects" className={styles.actionCard}>
              <h3>Projects</h3>
              <p>Explore funded projects and their progress</p>
            </a>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>Footer</p>
      </footer>
    </div>
  );
}
