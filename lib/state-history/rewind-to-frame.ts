import type { StateHistory } from './state-history-storage'
import type { StateSnapshot } from './state-snapshot'
import { getSnapshotAtFrame } from './state-history-storage'

/**
 * Rewind to a specific frame by finding the snapshot at or before that frame
 * 
 * @param history - State history to search
 * @param frame - Frame number to rewind to
 * @returns Snapshot at or before frame, or null if not found
 */
export const rewindToFrame = (
	history: StateHistory,
	frame: number,
): StateSnapshot | null => {
	return getSnapshotAtFrame(history, frame)
}

