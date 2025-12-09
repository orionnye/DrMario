import type { GameState } from './game-state'

export type StateSnapshot = GameState & {
	readonly timestamp: number
}

type CreateStateSnapshotParams = {
	state: GameState
	frame: number
}

/**
 * Create immutable snapshot of game state with deep copy
 * 
 * @param state - Game state to snapshot
 * @param frame - Frame number for this snapshot
 * @returns Deep copy snapshot with timestamp
 */
export const createStateSnapshot = ({
	state,
	frame,
}: CreateStateSnapshotParams): StateSnapshot => {
	// Deep copy arrays and nested objects
	const fallingPills = state.fallingPills.map((fallingPill) => ({
		...fallingPill,
		colors: [...fallingPill.colors] as [typeof fallingPill.colors[0], typeof fallingPill.colors[1]],
	}))

	const lockedPills = state.lockedPills.map((pill) => ({
		...pill,
		colors: [...pill.colors] as [typeof pill.colors[0], typeof pill.colors[1]],
	}))

	return {
		fallingPills,
		lockedPills,
		seed: state.seed,
		minY: state.minY,
		fallSpeed: state.fallSpeed,
		frame,
		timestamp: Date.now(),
	}
}

