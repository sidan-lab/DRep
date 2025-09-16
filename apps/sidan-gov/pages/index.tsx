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

        {/* Page Navigation Cards - Creative Masonry Grid */}
        <div className={styles.pageGrid}>
          <Link href="/drep-voting" className={`${styles.pageCard} ${styles.tallCard}`}>
            <div className={styles.pageCardContent}>
              <h3 className={styles.pageTitle}>DRep Voting</h3>
              <p className={styles.pageDescription}>Track and analyze SIDAN Lab&apos;s governance participation</p>
            </div>
            <div className={styles.pageImageContainer}>
              <img 
                src="/drep-voting-preview.png" 
                alt="DRep Voting Preview" 
                className={styles.pageImage}
              />
            </div>
          </Link>

          <Link href="/catalyst-proposals/new-proposals" className={`${styles.pageCard} ${styles.featuredCard}`}>
            <div className={styles.pageCardContent}>
              <div className={styles.newBadge}>NEW</div>
              <h3 className={styles.pageTitle}>New Proposals</h3>
              <p className={styles.pageDescription}>Explore our latest Catalyst Fund 14 proposals</p>
            </div>
            <div className={styles.pageImageContainer}>
              <img 
                src="/cyalyst-proposals-preview.png" 
                alt="New Catalyst Proposals Preview" 
                className={styles.pageImage}
              />
            </div>
          </Link>

          <Link href="/catalyst-proposals" className={styles.pageCard}>
            <div className={styles.pageCardContent}>
              <h3 className={styles.pageTitle}>All Proposals</h3>
              <p className={styles.pageDescription}>Complete history of our Catalyst journey</p>
            </div>
            <div className={styles.pageImageContainer}>
              <img 
                src="/cyalyst-proposals-preview.png" 
                alt="Catalyst Proposals Preview" 
                className={styles.pageImage}
              />
            </div>
          </Link>

          <Link href="/org-stats" className={`${styles.pageCard} ${styles.wideCard}`}>
            <div className={styles.pageCardContent}>
              <h3 className={styles.pageTitle}>SIDAN Stats</h3>
              <p className={styles.pageDescription}>Comprehensive metrics and performance insights</p>
            </div>
            <div className={styles.pageImageContainer}>
              <img 
                src="/sidan-stats-preview.png" 
                alt="SIDAN Stats Preview" 
                className={styles.pageImage}
              />
            </div>
          </Link>

          <Link href="/stake-pool" className={styles.pageCard}>
            <div className={styles.pageCardContent}>
              <h3 className={styles.pageTitle}>Stake Pool</h3>
              <p className={styles.pageDescription}>Monitor pool performance and delegator activity</p>
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
              <p className={styles.pageDescription}>Open source contributions and development</p>
            </div>
            <div className={styles.pageImageContainer}>
              <img 
                src="/project-preview.png" 
                alt="Projects Preview" 
                className={styles.pageImage}
              />
            </div>
          </Link>

          <Link href="/contributors" className={`${styles.pageCard} ${styles.tallCard}`}>
            <div className={styles.pageCardContent}>
              <h3 className={styles.pageTitle}>Contributors</h3>
              <p className={styles.pageDescription}>Meet our talented team and community</p>
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
              <p className={styles.pageDescription}>Workshops, meetups, and ecosystem engagement</p>
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