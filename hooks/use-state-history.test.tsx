import { describe, test, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import assert from 'riteway'
import { useStateHistory } from './use-state-history'
import type { GameState } from '@/lib/state-history/game-state'
import { createPill } from '@/lib/pill/pill'
import { createFallingPill } from '@/lib/pill-falling/pill-fall-state'

const createTestState = (frame: number): GameState => ({
	fallingPills: [],
	lockedPills: [],
	seed: 12345,
	minY: 5,
	fallSpeed: 30,
	frame,
})

describe('useStateHistory', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.restoreAllMocks()
		vi.useRealTimers()
	})

	test('should initialize empty history on mount', () => {
		const given = 'hook mount'
		const should = 'initialize empty history'

		const { result } = renderHook(() =>
			useStateHistory({
				state: createTestState(0),
				snapshotInterval: 10,
			}),
		)

		assert({
			given,
			should: 'should have empty history',
			actual: result.current.history.snapshots.length === 0,
			expected: true,
		})

		assert({
			given,
			should: 'should have snapshotCount of 0',
			actual: result.current.snapshotCount === 0,
			expected: true,
		})
	})

	test('should capture snapshot at configurable interval', () => {
		const given = 'hook with snapshot interval'
		const should = 'capture snapshot at interval'

		const { result, rerender } = renderHook(
			({ state, interval }) =>
				useStateHistory({
					state,
					snapshotInterval: interval,
				}),
			{
				initialProps: {
					state: createTestState(0),
					interval: 5,
				},
			},
		)

		// Initial state - no snapshot yet
		assert({
			given,
			should: 'should have 0 snapshots initially',
			actual: result.current.snapshotCount === 0,
			expected: true,
		})

		// Update state to frame 5 (interval reached)
		act(() => {
			rerender({ state: createTestState(5), interval: 5 })
		})

		assert({
			given,
			should: 'should have captured snapshot at interval',
			actual: result.current.snapshotCount === 1,
			expected: true,
		})

		// Update to frame 10 (another interval)
		act(() => {
			rerender({ state: createTestState(10), interval: 5 })
		})

		assert({
			given,
			should: 'should have captured second snapshot',
			actual: result.current.snapshotCount === 2,
			expected: true,
		})
	})

	test('should support manual snapshot capture', () => {
		const given = 'hook with manual capture'
		const should = 'capture snapshot on demand'

		const { result } = renderHook(() =>
			useStateHistory({
				state: createTestState(10),
				snapshotInterval: 100, // Large interval, won't auto-capture
			}),
		)

		const initialCount = result.current.snapshotCount

		act(() => {
			result.current.captureSnapshot()
		})

		assert({
			given,
			should: 'should have one more snapshot after manual capture',
			actual: result.current.snapshotCount === initialCount + 1,
			expected: true,
		})

		assert({
			given,
			should: 'latest snapshot should have correct frame',
			actual: result.current.getLatestSnapshot()?.frame === 10,
			expected: true,
		})
	})

	test('should preserve history on unmount', () => {
		const given = 'hook unmount'
		const should = 'preserve history until explicitly cleared'

		const { result, unmount } = renderHook(() =>
			useStateHistory({
				state: createTestState(0),
				snapshotInterval: 10,
			}),
		)

		// Capture a snapshot
		act(() => {
			result.current.captureSnapshot()
		})

		const snapshotCountBeforeUnmount = result.current.snapshotCount

		// Unmount
		unmount()

		// Remount
		const { result: result2 } = renderHook(() =>
			useStateHistory({
				state: createTestState(1),
				snapshotInterval: 10,
			}),
		)

		// History should be empty on new mount (new instance)
		assert({
			given,
			should: 'new hook instance should have empty history',
			actual: result2.current.snapshotCount === 0,
			expected: true,
		})
	})

	test('should clear history when clearHistory is called', () => {
		const given = 'hook with snapshots'
		const should = 'clear all snapshots when clearHistory called'

		const { result } = renderHook(() =>
			useStateHistory({
				state: createTestState(0),
				snapshotInterval: 10,
			}),
		)

		// Capture multiple snapshots
		act(() => {
			result.current.captureSnapshot()
		})
		act(() => {
			result.current.captureSnapshot()
		})
		act(() => {
			result.current.captureSnapshot()
		})

		assert({
			given,
			should: 'should have 3 snapshots before clear',
			actual: result.current.snapshotCount === 3,
			expected: true,
		})

		act(() => {
			result.current.clearHistory()
		})

		assert({
			given,
			should: 'should have 0 snapshots after clear',
			actual: result.current.snapshotCount === 0,
			expected: true,
		})
	})

	test('should return history array and control functions', () => {
		const given = 'hook'
		const should = 'return history array and control functions'

		const { result } = renderHook(() =>
			useStateHistory({
				state: createTestState(0),
				snapshotInterval: 10,
			}),
		)

		assert({
			given,
			should: 'should return history object',
			actual: typeof result.current.history === 'object' && result.current.history !== null,
			expected: true,
		})

		assert({
			given,
			should: 'should return captureSnapshot function',
			actual: typeof result.current.captureSnapshot === 'function',
			expected: true,
		})

		assert({
			given,
			should: 'should return clearHistory function',
			actual: typeof result.current.clearHistory === 'function',
			expected: true,
		})

		assert({
			given,
			should: 'should return getLatestSnapshot function',
			actual: typeof result.current.getLatestSnapshot === 'function',
			expected: true,
		})

		assert({
			given,
			should: 'should return snapshotCount',
			actual: typeof result.current.snapshotCount === 'number',
			expected: true,
		})
	})

	test('should capture snapshot with correct state properties', () => {
		const given = 'hook with game state'
		const should = 'capture snapshot with all state properties'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 1,
			y: 0,
			orientation: 'HORIZONTAL',
		})

		const fallingPill = createFallingPill({
			pill,
			frameCount: 5,
			fallSpeed: 30,
		})

		const state: GameState = {
			fallingPills: [fallingPill],
			lockedPills: [],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 42,
		}

		const { result } = renderHook(() =>
			useStateHistory({
				state,
				snapshotInterval: 10,
			}),
		)

		act(() => {
			result.current.captureSnapshot()
		})

		const snapshot = result.current.getLatestSnapshot()

		assert({
			given,
			should: 'snapshot should exist',
			actual: snapshot !== null,
			expected: true,
		})

		if (snapshot) {
			assert({
				given,
				should: 'snapshot should have correct frame',
				actual: snapshot.frame === 42,
				expected: true,
			})

			assert({
				given,
				should: 'snapshot should have fallingPills',
				actual: snapshot.fallingPills.length === 1,
				expected: true,
			})

			assert({
				given,
				should: 'snapshot should have seed',
				actual: snapshot.seed === 12345,
				expected: true,
			})
		}
	})
})

