import type { StateSnapshot } from './state-snapshot'

export type StateHistory = {
	readonly snapshots: readonly StateSnapshot[]
	readonly maxDepth: number
}

type CreateStateHistoryParams = {
	maxDepth?: number
}

const DEFAULT_MAX_DEPTH = 1000

/**
 * Create new state history storage
 * 
 * @param maxDepth - Maximum number of snapshots to store (default: 1000)
 * @returns Empty state history
 */
export const createStateHistory = ({
	maxDepth = DEFAULT_MAX_DEPTH,
}: CreateStateHistoryParams = {}): StateHistory => {
	return {
		snapshots: [],
		maxDepth,
	}
}

/**
 * Add snapshot to history, maintaining chronological order and maxDepth limit
 * 
 * @param history - Current state history
 * @param snapshot - Snapshot to add
 * @returns New history with snapshot added (oldest removed if over maxDepth)
 */
export const addSnapshot = (
	history: StateHistory,
	snapshot: StateSnapshot,
): StateHistory => {
	const newSnapshots = [...history.snapshots, snapshot]

	// Remove oldest snapshots if over maxDepth (FIFO)
	if (newSnapshots.length > history.maxDepth) {
		const excess = newSnapshots.length - history.maxDepth
		return {
			...history,
			snapshots: newSnapshots.slice(excess),
		}
	}

	return {
		...history,
		snapshots: newSnapshots,
	}
}

/**
 * Find snapshot at or before the specified frame
 * 
 * @param history - State history to search
 * @param frame - Frame number to find
 * @returns Snapshot at or before frame, or null if not found
 */
export const getSnapshotAtFrame = (
	history: StateHistory,
	frame: number,
): StateSnapshot | null => {
	if (history.snapshots.length === 0) {
		return null
	}

	// Find the latest snapshot at or before the requested frame
	// Since snapshots are in chronological order, search backwards
	for (let i = history.snapshots.length - 1; i >= 0; i--) {
		const snapshot = history.snapshots[i]
		if (snapshot.frame <= frame) {
			return snapshot
		}
	}

	// No snapshot found at or before frame
	return null
}

/**
 * Clear all snapshots from history
 * 
 * @param history - State history to clear
 * @returns New history with empty snapshots array
 */
export const clearHistory = (history: StateHistory): StateHistory => {
	return {
		...history,
		snapshots: [],
	}
}

/**
 * Get snapshots between two frame numbers (inclusive)
 * 
 * @param history - State history to search
 * @param startFrame - Start frame (inclusive)
 * @param endFrame - End frame (inclusive)
 * @returns Array of snapshots in range
 */
export const getHistoryRange = (
	history: StateHistory,
	startFrame: number,
	endFrame: number,
): readonly StateSnapshot[] => {
	return history.snapshots.filter(
		(snapshot) => snapshot.frame >= startFrame && snapshot.frame <= endFrame,
	)
}

/**
 * Get the most recent snapshot
 * 
 * @param history - State history
 * @returns Latest snapshot or null if empty
 */
export const getLatestSnapshot = (history: StateHistory): StateSnapshot | null => {
	if (history.snapshots.length === 0) {
		return null
	}

	return history.snapshots[history.snapshots.length - 1]
}

/**
 * Get total number of snapshots stored
 * 
 * @param history - State history
 * @returns Number of snapshots
 */
export const getSnapshotCount = (history: StateHistory): number => {
	return history.snapshots.length
}

