import { describe, test } from 'vitest'
import assert from 'riteway'
import { createStateHistory, addSnapshot } from './state-history-storage'
import { createStateSnapshot } from './state-snapshot'
import { rewindToFrame } from './rewind-to-frame'

const createTestState = (frame: number) => ({
	fallingPills: [] as const,
	lockedPills: [] as const,
	seed: 12345,
	minY: 5,
	fallSpeed: 30,
	frame,
})

describe('rewindToFrame', () => {
	test('should find snapshot at exact frame', () => {
		const given = 'history with snapshots at frames 0, 5, 10'
		const should = 'find snapshot at exact frame'

		const history = createStateHistory({ maxDepth: 10 })
		const snapshot0 = createStateSnapshot({ state: createTestState(0), frame: 0 })
		const snapshot5 = createStateSnapshot({ state: createTestState(5), frame: 5 })
		const snapshot10 = createStateSnapshot({ state: createTestState(10), frame: 10 })

		const history1 = addSnapshot(history, snapshot0)
		const history2 = addSnapshot(history1, snapshot5)
		const history3 = addSnapshot(history2, snapshot10)

		const result = rewindToFrame(history3, 5)

		assert({
			given,
			should,
			actual: result !== null && result.frame === 5,
			expected: true,
		})
	})

	test('should find snapshot at or before frame', () => {
		const given = 'history with snapshots at frames 0, 5, 10'
		const should = 'find snapshot at or before requested frame'

		const history = createStateHistory({ maxDepth: 10 })
		const snapshot0 = createStateSnapshot({ state: createTestState(0), frame: 0 })
		const snapshot5 = createStateSnapshot({ state: createTestState(5), frame: 5 })
		const snapshot10 = createStateSnapshot({ state: createTestState(10), frame: 10 })

		const history1 = addSnapshot(history, snapshot0)
		const history2 = addSnapshot(history1, snapshot5)
		const history3 = addSnapshot(history2, snapshot10)

		const result = rewindToFrame(history3, 7)

		assert({
			given,
			should: 'should return snapshot at frame 5 (closest before 7)',
			actual: result !== null && result.frame === 5,
			expected: true,
		})
	})

	test('should return null if frame before first snapshot', () => {
		const given = 'history with snapshots starting at frame 5'
		const should = 'return null for frame before first snapshot'

		const history = createStateHistory({ maxDepth: 10 })
		const snapshot5 = createStateSnapshot({ state: createTestState(5), frame: 5 })
		const history1 = addSnapshot(history, snapshot5)

		const result = rewindToFrame(history1, 0)

		assert({
			given,
			should,
			actual: result === null,
			expected: true,
		})
	})

	test('should return null if history is empty', () => {
		const given = 'empty history'
		const should = 'return null'

		const history = createStateHistory({ maxDepth: 10 })

		const result = rewindToFrame(history, 0)

		assert({
			given,
			should,
			actual: result === null,
			expected: true,
		})
	})

	test('should not mutate history storage', () => {
		const given = 'history with snapshots'
		const should = 'not mutate history storage'

		const history = createStateHistory({ maxDepth: 10 })
		const snapshot0 = createStateSnapshot({ state: createTestState(0), frame: 0 })
		const snapshot5 = createStateSnapshot({ state: createTestState(5), frame: 5 })
		const history1 = addSnapshot(history, snapshot0)
		const history2 = addSnapshot(history1, snapshot5)

		const originalSnapshotCount = history2.snapshots.length

		rewindToFrame(history2, 5)

		assert({
			given,
			should,
			actual: history2.snapshots.length === originalSnapshotCount,
			expected: true,
		})
	})

	test('should return complete game state for frame', () => {
		const given = 'history with snapshot'
		const should = 'return complete game state'

		const history = createStateHistory({ maxDepth: 10 })
		const state = createTestState(42)
		const snapshot = createStateSnapshot({ state, frame: 42 })
		const history1 = addSnapshot(history, snapshot)

		const result = rewindToFrame(history1, 42)

		assert({
			given,
			should: 'should return snapshot',
			actual: result !== null,
			expected: true,
		})

		if (result) {
			assert({
				given,
				should: 'should have all state properties',
				actual:
					Array.isArray(result.fallingPills) &&
					Array.isArray(result.lockedPills) &&
					typeof result.seed === 'number' &&
					typeof result.minY === 'number' &&
					typeof result.fallSpeed === 'number' &&
					typeof result.frame === 'number',
				expected: true,
			})
		}
	})
})

