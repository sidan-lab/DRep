// Cardano Genesis Parameters
const GENESIS_TIMESTAMP = 1506203091; // September 23, 2017, 21:44:51 UTC
const EPOCH_LENGTH_SECONDS = 432000; // 5 days in seconds

/**
 * Calculate epoch number for a given timestamp
 * @param timestamp - Unix timestamp in seconds
 * @returns Epoch number
 */
export function getEpochForTimestamp(timestamp: number): number {
    return Math.floor((timestamp - GENESIS_TIMESTAMP) / EPOCH_LENGTH_SECONDS);
}

/**
 * Calculate epoch number for a given Date object
 * @param date - JavaScript Date object
 * @returns Epoch number
 */
export function getEpochForDate(date: Date): number {
    return getEpochForTimestamp(Math.floor(date.getTime() / 1000));
}

/**
 * Calculate epoch start time for a given epoch number
 * @param epochNo - Epoch number
 * @returns Unix timestamp in seconds
 */
export function getEpochStartTime(epochNo: number): number {
    return GENESIS_TIMESTAMP + (epochNo * EPOCH_LENGTH_SECONDS);
}

/**
 * Calculate year for a given epoch number
 * @param epochNo - Epoch number
 * @returns Year
 */
export function getYearForEpoch(epochNo: number): number {
    const epochStartTime = getEpochStartTime(epochNo);
    return new Date(epochStartTime * 1000).getFullYear();
} 