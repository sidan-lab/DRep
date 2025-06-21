import { useData } from '../contexts/DataContext';
import styles from "../styles/page.module.css";
import Link from 'next/link';

export default function DRepVoting() {
    const { drepVotingData, isLoading, error } = useData();

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

    const votes = drepVotingData?.votes || [];
    const delegationData = drepVotingData?.delegationData;

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>DRep Voting</h1>
                    <p className={styles.subtitle}>
                        Track Sidan's DRep voting activity and delegation information
                    </p>
                </div>

                {/* Stats Section */}
                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <h3>Total Votes</h3>
                        <div className={styles.statNumber}>{votes.length}</div>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Total Delegators</h3>
                        <div className={styles.statNumber}>
                            {delegationData?.timeline?.total_delegators || 0}
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Total Delegated ADA</h3>
                        <div className={styles.statNumber}>
                            {delegationData?.timeline?.total_amount_ada
                                ? `${(delegationData.timeline.total_amount_ada / 1000000).toFixed(1)}M`
                                : '0'
                            }
                        </div>
                    </div>
                </div>

                {/* Recent Votes Section */}
                <div className={styles.quickActions}>
                    <h2>Recent Votes</h2>
                    <div className={styles.actionGrid}>
                        {votes.slice(0, 6).map((vote, index) => (
                            <div key={index} className={styles.actionCard}>
                                <h3>{vote.proposalTitle || `Proposal ${vote.proposalId}`}</h3>
                                <p><strong>Vote:</strong> {vote.vote}</p>
                                <p><strong>Date:</strong> {new Date(vote.blockTime).toLocaleDateString()}</p>
                                <p><strong>Type:</strong> {vote.proposalType}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DRep Information */}
                {delegationData?.drepInfo && (
                    <div className={styles.quickActions}>
                        <h2>DRep Information</h2>
                        <div className={styles.actionGrid}>
                            <div className={styles.actionCard}>
                                <h3>DRep ID</h3>
                                <p><strong>ID:</strong> {delegationData.drepInfo.drepId}</p>
                                <p><strong>Amount:</strong> {(parseInt(delegationData.drepInfo.amount) / 1000000).toFixed(2)}M ADA</p>
                                <p><strong>Status:</strong> {delegationData.drepInfo.active ? 'Active' : 'Inactive'}</p>
                                <p><strong>Expires:</strong> Epoch {delegationData.drepInfo.expires_epoch_no}</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
} 