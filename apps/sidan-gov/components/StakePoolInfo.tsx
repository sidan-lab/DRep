import React, { useMemo, useState } from 'react';
import { useData } from '../contexts/DataContext';
import styles from '../styles/StakePool.module.css';
import StakePoolGrowthChart from './StakePoolGrowthChart';

interface CopyableCardProps {
  title: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
}

const CopyableCard: React.FC<CopyableCardProps> = ({ title, value, onCopy, copied }) => {
  return (
    <div 
      className={styles.copyableCard} 
      onClick={onCopy}
      title="Click to copy"
    >
      <div className={styles.cardContent}>
        <div>
          <div className={styles.cardTitle}>{title}</div>
          <div className={styles.cardValue}>{value}</div>
        </div>
        <div className={styles.copyIcon}>
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

const StakePoolInfo: React.FC = () => {
    const { stakePoolData, isLoading, error } = useData();
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = async (text: string, fieldName: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(fieldName);
            setTimeout(() => setCopiedField(null), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    // Process pool history data for the growth chart
    const growthChartData = useMemo(() => {
        if (!stakePoolData?.poolHistory) return [];

        const EPOCH_LENGTH_DAYS = 5;
        const GENESIS_TIMESTAMP = 1506203091; // Cardano genesis timestamp

        try {
            const allHistoryRecords: Array<{
                date: Date;
                liveStake: number;
                delegators: number;
            }> = [];

            Object.entries(stakePoolData.poolHistory).forEach(([, historyData]) => {
                historyData.history.forEach(record => {
                    if (record.epoch_no) {
                        // Calculate date from epoch
                        const epochStartTime = GENESIS_TIMESTAMP + (record.epoch_no * EPOCH_LENGTH_DAYS * 24 * 60 * 60);
                        const date = new Date(epochStartTime * 1000);

                        // Parse stake values
                        let liveStake = 0;
                        let delegators = 0;

                        try {
                            liveStake = record.active_stake ? parseFloat(record.active_stake) / 1_000_000 : 0; // Using active_stake as proxy for live_stake
                            delegators = record.delegator_cnt || 0;
                        } catch (e) {
                            console.error(`Error parsing stake values for epoch ${record.epoch_no}:`, e);
                        }

                        allHistoryRecords.push({
                            date,
                            liveStake,
                            delegators
                        });
                    }
                });
            });

            // Sort by date and return
            return allHistoryRecords
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(-50); // Take last 50 records to avoid overwhelming the chart
        } catch (error) {
            console.error('Error processing pool history data:', error);
            return [];
        }
    }, [stakePoolData?.poolHistory]);

    if (isLoading) {
        return <div className={styles.loading}>Loading stake pool data...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }

    if (!stakePoolData || !stakePoolData.poolInfo) {
        return <div className={styles.error}>No stake pool data available</div>;
    }

    const { poolInfo } = stakePoolData.poolInfo;

    const formatAda = (amount: string | null) => {
        if (!amount) return 'N/A';
        const adaAmount = parseFloat(amount) / 1_000_000; // Convert lovelace to ADA
        if (adaAmount >= 1_000_000) {
            return `${(adaAmount / 1_000_000).toFixed(1)}M`;
        } else if (adaAmount >= 1_000) {
            return `${(adaAmount / 1_000).toFixed(1)}K`;
        }
        return adaAmount.toLocaleString();
    };

    const formatPercentage = (value: number | null) => {
        if (value === null) return 'N/A';
        return `${value.toFixed(2)}%`;
    };

    // Pool identifiers
    const bech32PoolId = "pool1wnrrg33lw9fxcn0h3x3vexh78up660ajgk7pvrlrz5kvcgh9khs";
    const poolId = "74c634463f71526c4df789a2cc9afe3f03ad3fb245bc160fe3152d6c";
    const vrfHash = "43f16450a38ca4d8719439b7a8b44a27d3665e2b13c7da6847230a141ab7e411";

    return (
        <div className={styles.stakePoolInfo}>
            <div className={styles.poolHeader}>
                <h2 className={styles.poolTitle}>
                    {poolInfo?.meta_json?.name || 'Stake Pool'}
                    <span className={styles.poolTicker}>
                        {poolInfo?.meta_json?.ticker && `(${poolInfo.meta_json.ticker})`}
                    </span>
                </h2>
                <div className={styles.poolStatus}>
                    <span className={`${styles.statusIndicator} ${styles[poolInfo?.pool_status?.toLowerCase() || 'unknown']}`}>
                        {poolInfo?.pool_status || 'Unknown'}
                    </span>
                    <div className={styles.registrationDate}>
                        <span className={styles.registrationValue}>Oct 14, 2021 3:03:55 PM</span>
                    </div>
                </div>
            </div>

            <div className={styles.masonryGrid}>
                <div className={styles.leftColumn}>
                    <CopyableCard
                        title="BECH32 Pool ID"
                        value={bech32PoolId}
                        onCopy={() => handleCopy(bech32PoolId, 'bech32')}
                        copied={copiedField === 'bech32'}
                    />
                    <CopyableCard
                        title="Pool ID"
                        value={poolId}
                        onCopy={() => handleCopy(poolId, 'poolId')}
                        copied={copiedField === 'poolId'}
                    />
                    <CopyableCard
                        title="VRF Hash"
                        value={vrfHash}
                        onCopy={() => handleCopy(vrfHash, 'vrfHash')}
                        copied={copiedField === 'vrfHash'}
                    />
                </div>

                <div className={styles.rightColumn}>
                    {/* Pool Ticker Card */}
                    <div className={`${styles.masonryCard} ${styles.compactCard}`}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardLabel}>Ticker</div>
                            <div className={styles.cardValue}>SIDAN</div>
                        </div>
                    </div>

                    {/* Live Stake Card */}
                    <div className={`${styles.masonryCard} ${styles.metricCard}`}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardLabel}>Live Stake</div>
                            <div className={styles.cardValue}>₳{formatAda(poolInfo?.live_stake ?? null)}</div>
                        </div>
                    </div>

                    {/* Live Delegators Card */}
                    <div className={`${styles.masonryCard} ${styles.metricCard}`}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardLabel}>Live Delegators</div>
                            <div className={styles.cardValue}>{(poolInfo?.live_delegators || 0).toLocaleString()}</div>
                        </div>
                    </div>

                    {/* Block Count Card */}
                    <div className={`${styles.masonryCard} ${styles.metricCard}`}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardLabel}>Block Count</div>
                            <div className={styles.cardValue}>{(poolInfo?.block_count || 0).toLocaleString()}</div>
                        </div>
                    </div>

                    {/* Live Saturation Card */}
                    <div className={`${styles.masonryCard} ${styles.metricCard}`}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardLabel}>Live Saturation</div>
                            <div className={styles.cardValue}>{formatPercentage(poolInfo?.live_saturation ?? null)}</div>
                        </div>
                    </div>

                    {/* Margin Card */}
                    <div className={`${styles.masonryCard} ${styles.compactCard}`}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardLabel}>Margin</div>
                            <div className={styles.cardValue}>
                                {poolInfo?.margin ? `${(poolInfo.margin * 100).toFixed(2)}%` : 'N/A'}
                            </div>
                        </div>
                    </div>

                    {/* Fixed Cost Card */}
                    <div className={`${styles.masonryCard} ${styles.compactCard}`}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardLabel}>Fixed Cost</div>
                            <div className={styles.cardValue}>
                                {poolInfo?.fixed_cost ? `₳${(parseFloat(poolInfo.fixed_cost) / 1_000_000).toFixed(0)}` : 'N/A'}
                            </div>
                        </div>
                    </div>

                    {/* Pledge Card */}
                    <div className={`${styles.masonryCard} ${styles.compactCard}`}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardLabel}>Pledge</div>
                            <div className={styles.cardValue}>
                                {poolInfo?.live_pledge ? `₳${(parseFloat(poolInfo.live_pledge) / 1_000_000).toFixed(0)}` : 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {growthChartData.length > 0 && (
                <StakePoolGrowthChart data={growthChartData} />
            )}
        </div>
    );
};

export default StakePoolInfo; 