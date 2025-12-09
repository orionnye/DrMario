import type { StateSnapshot } from './state-snapshot'
import type { FallingPill } from '../pill-falling/pill-fall-state'
import type { Pill } from '../pill/pill'

type RestoreStateParams = {
	readonly snapshot: StateSnapshot
	readonly setFallingPills: (value: FallingPill[]) => void
	readonly setLockedPills: (value: Pill[]) => void
	readonly setSeed: (value: number) => void
	readonly setMinY?: (value: number) => void // Optional since minY may be computed from seed
	readonly setFallSpeed: (value: number) => void
}

/**
 * Restore game state from a snapshot
 * Updates all state setters atomically
 * 
 * @param snapshot - State snapshot to restore from
 * @param setFallingPills - Setter for falling pills state
 * @param setLockedPills - Setter for locked pills state
 * @param setSeed - Setter for seed state
 * @param setMinY - Setter for minY state
 * @param setFallSpeed - Setter for fall speed state
 */
export const restoreState = ({
	snapshot,
	setFallingPills,
	setLockedPills,
	setSeed,
	setMinY,
	setFallSpeed,
}: RestoreStateParams): void => {
	// Validate snapshot has required properties
	if (
		!snapshot ||
		!Array.isArray(snapshot.fallingPills) ||
		!Array.isArray(snapshot.lockedPills) ||
		typeof snapshot.seed !== 'number' ||
		typeof snapshot.minY !== 'number' ||
		typeof snapshot.fallSpeed !== 'number'
	) {
		// Invalid snapshot, do not restore
		return
	}

	// Update all state setters atomically
	setFallingPills([...snapshot.fallingPills])
	setLockedPills([...snapshot.lockedPills])
	setSeed(snapshot.seed)
	if (setMinY) {
		setMinY(snapshot.minY)
	}
	setFallSpeed(snapshot.fallSpeed)
}

