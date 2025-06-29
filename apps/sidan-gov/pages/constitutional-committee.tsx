import React from 'react';
import { useData } from '../contexts/DataContext';
import styles from '../styles/ConstitutionalCommittee.module.css';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';

export default function ConstitutionalCommittee() {
  const { isLoading, error } = useData();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Navigation />
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Navigation />
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navigation />
      <main className={styles.main}>
        <PageHeader 
          title={
            <>
              Constitutional Committee{' '}
              <span className={styles.applicationText}>Application</span>
            </>
          }
          subtitle="SIDAN LAB Application for the Constitutional Committee election 2025"
        />
        
        <div className={styles.imageSection}>
          <img 
            src="/sidan-crew.png.png" 
            alt="SIDAN Lab Team" 
            className={styles.teamImage}
          />
        </div>
        
        <div className={styles.introSection}>
          <p className={styles.introText}>
            Cardano is voting on new seats at the Constitutional Committee and SIDAN LAB is ready to go for it, here our application. If you approve of our actions and experience you are welcome to vote for us.
          </p>
        </div>
        
        <div className={styles.voteButtonContainer}>
          <a 
            href="https://elections.constitution.gov.tools/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.voteButton}
          >
            🗳️ Vote for Us
          </a>
        </div>
        
        <div className={styles.content}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience in Cardano</h2>
            <div className={styles.experienceGrid}>
              <div className={styles.experienceCard}>
                <h3 className={styles.experienceTitle}>Governance</h3>
                <p className={styles.experienceDescription}>
                  Review governance action as DRep, posting rationale on every action to contribute and safeguard Cardano Treasury and operating the SIDAN Stake Pool
                </p>
              </div>
              
              <div className={styles.experienceCard}>
                <h3 className={styles.experienceTitle}>Developer Tooling</h3>
                <p className={styles.experienceDescription}>
                  Developing and maintaining MESH transaction library and SIDAN Lab Whisky Rust library, an open-source Rust library for easy Cardano transaction building and unit testing.
                </p>
              </div>
              
              <div className={styles.experienceCard}>
                <h3 className={styles.experienceTitle}>Community Building and Education</h3>
                <p className={styles.experienceDescription}>
                  Host of CardanoHK and Buidler Fest Asia, introducing and onboarding developers, projects and businesses to the Ecosystem
                </p>
              </div>
              
              <div className={styles.experienceCard}>
                <h3 className={styles.experienceTitle}>Products</h3>
                <p className={styles.experienceDescription}>
                  Developing DeltaDeFi, hydra orderbook dex to bridge Cardano with HFT traders
                </p>
              </div>
              
              <div className={styles.experienceCard}>
                <h3 className={styles.experienceTitle}>Project Catalyst</h3>
                <p className={styles.experienceDescription}>
                  Funded Proposer, initiated proposal pitch & review events, online sessions and workshops
                </p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Commitment Journey</h2>
            <div className={styles.timelineContainer}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineStep}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepLabel}>Why</div>
                </div>
                <div className={styles.timelineCard}>
                  <h3 className={styles.timelineTitle}>Our Motivations for the CC</h3>
                  <p className={styles.timelineText}>
                    We already take governance seriously as a DRep and we see the CC as a natural next step to protect and uphold the Cardano Constitution. The Constitution is what enables decentralized governance to exist, and the CC's job is responsible for ensuring that the Constitution's principles are upheld and enforced. That is a responsibility we are ready to take on.
                  </p>
                  <p className={styles.timelineText}>
                    To have hands-on experience at Cardano core governance, to build serious expertise & understanding and to learn and train ourselves at the hardest of all governance roles.
                  </p>
                </div>
              </div>

              <div className={styles.timelineConnector}></div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineStep}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepLabel}>What</div>
                </div>
                <div className={styles.timelineCard}>
                  <h3 className={styles.timelineTitle}>What to Expect from Us</h3>
                  <p className={styles.timelineText}>
                    We will investigate each proposal's constitutionality with care and without shortcuts. We will maintain full transparency by publishing all rationales, votes, and activity through a new open-source repository on GitHub, as we already do for our DRep actions. We commit uncapped time to due diligence. No vote will be cast without a proper review.
                  </p>
                </div>
              </div>

              <div className={styles.timelineConnector}></div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineStep}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepLabel}>How</div>
                </div>
                <div className={styles.timelineCard}>
                  <h3 className={styles.timelineTitle}>Guiding Goals</h3>
                  <p className={styles.timelineText}>
                    The CC should serve as a check-and-balance mechanism. The goal is not just voting, but protecting the process — ensuring that proposals follow what the Constitution sets out in terms of oversight, transparency, and fairness.
                  </p>
                  <p className={styles.timelineText}>
                    Especially in the early stages of governance, where things are still being figured out, the CC needs to bring clarity and discipline to prevent systemic risk.
                  </p>
                  <p className={styles.timelineText}>
                    That means: guarding the process, not just assessing content.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>If . . .</h2>
            <div className={styles.card}>
              <p className={styles.motivationText}>
                If DReps approve our application, we will track and display our CC activities similar to our activities as on the DRep page at this dashboard where we will give an easy overview and insights on all our votes and rationales.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 