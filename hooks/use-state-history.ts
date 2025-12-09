import { useState, useEffect, useRef, useCallback } from 'react'
import type { GameState } from '@/lib/state-history/game-state'
import {
	createStateHistory,
	addSnapshot,
	getLatestSnapshot,
	clearHistory as clearHistoryStorage,
	type StateHistory,
} from '@/lib/state-history/state-history-storage'
import { createStateSnapshot } from '@/lib/state-history/state-snapshot'

type UseStateHistoryParams = {
	readonly state: GameState
	readonly snapshotInterval?: number // Capture snapshot every N frames
	readonly maxDepth?: number // Maximum history depth
}

type UseStateHistoryReturn = {
	readonly history: StateHistory
	readonly snapshotCount: number
	readonly getLatestSnapshot: () => ReturnType<typeof getLatestSnapshot> | null
	readonly captureSnapshot: () => void
	readonly clearHistory: () => void
}

/**
 * React hook for managing game state history and snapshot capture
 * 
 * @param state - Current game state to track
 * @param snapshotInterval - Capture snapshot every N frames (default: 10)
 * @param maxDepth - Maximum number of snapshots to store (default: 1000)
 * @returns History object and control functions
 */
export const useStateHistory = ({
	state,
	snapshotInterval = 10,
	maxDepth = 1000,
}: UseStateHistoryParams): UseStateHistoryReturn => {
	const [history, setHistory] = useState<StateHistory>(() =>
		createStateHistory({ maxDepth }),
	)

	const lastCapturedFrameRef = useRef<number | null>(null)

	// Capture snapshot at configurable intervals based on frame changes
	useEffect(() => {
		const currentFrame = state.frame

		// Initialize last captured frame on first run
		if (lastCapturedFrameRef.current === null) {
			lastCapturedFrameRef.current = currentFrame
			return
		}

		// Check if we should capture a snapshot based on interval
		const framesSinceLastCapture = currentFrame - lastCapturedFrameRef.current

		if (framesSinceLastCapture >= snapshotInterval) {
			const snapshot = createStateSnapshot({ state, frame: currentFrame })
			setHistory((prevHistory) => addSnapshot(prevHistory, snapshot))
			lastCapturedFrameRef.current = currentFrame
		}
	}, [state, snapshotInterval])

	// Manual snapshot capture
	const captureSnapshot = useCallback(() => {
		const snapshot = createStateSnapshot({ state, frame: state.frame })
		setHistory((prevHistory) => addSnapshot(prevHistory, snapshot))
		lastCapturedFrameRef.current = state.frame
	}, [state])

	// Clear all history
	const clearHistory = useCallback(() => {
		setHistory((prevHistory) => clearHistoryStorage(prevHistory))
		lastCapturedFrameRef.current = null
	}, [])

	// Get latest snapshot
	const getLatestSnapshotWrapper = useCallback(() => {
		return getLatestSnapshot(history)
	}, [history])

	return {
		history,
		snapshotCount: history.snapshots.length,
		getLatestSnapshot: getLatestSnapshotWrapper,
		captureSnapshot,
		clearHistory,
	}
}

