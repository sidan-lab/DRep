import { useData } from '../contexts/DataContext';
import styles from "../styles/page.module.css";
import Link from 'next/link';

export default function Dashboard() {
  const { isLoading, error } = useData();

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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>SIDAN LAB Dashboard</h1>
          <p className={styles.subtitle}>
            Overview and insights on SIDAN LAB contributions and activities at the Cardano ecosystem
          </p>
        </div>

        {/* Page Navigation Cards */}
        <div className={styles.pageGrid}>
          <Link href="/drep-voting" className={styles.pageCard}>
            <div className={styles.pageCardContent}>
              <h3 className={styles.pageTitle}>DRep Voting</h3>
            </div>
            <div className={styles.pageImageContainer}>
              <img 
                src="/drep-voting-preview.png" 
                alt="DRep Voting Preview" 
                className={styles.pageImage}
              />
            </div>
          </Link>

          <Link href="/catalyst-proposals" className={styles.pageCard}>
            <div className={styles.pageCardContent}>
              <h3 className={styles.pageTitle}>Catalyst Proposals</h3>
            </div>
            <div className={styles.pageImageContainer}>
              <img 
                src="/cyalyst-proposals-preview.png" 
                alt="Catalyst Proposals Preview" 
                className={styles.pageImage}
              />
            </div>
          </Link>

          <Link href="/org-stats" className={styles.pageCard}>
            <div className={styles.pageCardContent}>
              <h3 className={styles.pageTitle}>Sidan Stats</h3>
            </div>
            <div className={styles.pageImageContainer}>
              <img 
                src="/sidan-stats-preview.png" 
                alt="Sidan Stats Preview" 
                className={styles.pageImage}
              />
            </div>
          </Link>

          <Link href="/stake-pool" className={styles.pageCard}>
            <div className={styles.pageCardContent}>
              <h3 className={styles.pageTitle}>Stake Pool</h3>
            </div>
            <div className={styles.pageImageContainer}>
              <img 
                src="/stake-pool-preview.png" 
                alt="Stake Pool Preview" 
                className={styles.pageImage}
              />
            </div>
          </Link>

          <Link href="/projects" className={styles.pageCard}>
            <div className={styles.pageCardContent}>
              <h3 className={styles.pageTitle}>Projects</h3>
            </div>
            <div className={styles.pageImageContainer}>
              <img 
                src="/project-preview.png" 
                alt="Projects Preview" 
                className={styles.pageImage}
              />
            </div>
          </Link>

          <Link href="/contributors" className={styles.pageCard}>
            <div className={styles.pageCardContent}>
              <h3 className={styles.pageTitle}>Contributors</h3>
            </div>
            <div className={styles.pageImageContainer}>
              <img 
                src="/contributors-preview.png" 
                alt="Contributors Preview" 
                className={styles.pageImage}
              />
            </div>
          </Link>

          <Link href="/community-events" className={styles.pageCard}>
            <div className={styles.pageCardContent}>
              <h3 className={styles.pageTitle}>Community Events</h3>
            </div>
            <div className={styles.pageImageContainer}>
              <img 
                src="/community-events-preview.png" 
                alt="Community Events Preview" 
                className={styles.pageImage}
              />
            </div>
          </Link>
        </div>


      </main>
    </div>
  );
} 