import { describe, test } from 'vitest'
import assert from 'riteway'
import type { StateSnapshot } from './state-snapshot'
import { createStateHistory, addSnapshot, getSnapshotAtFrame, clearHistory, getHistoryRange, getLatestSnapshot, getSnapshotCount } from './state-history-storage'
import { createStateSnapshot } from './state-snapshot'
import { createPill } from '../pill/pill'
import { createFallingPill } from '../pill-falling/pill-fall-state'

const createTestState = (frame: number) => ({
	fallingPills: [] as const,
	lockedPills: [] as const,
	seed: 12345,
	minY: 5,
	fallSpeed: 30,
	frame,
})

describe('createStateHistory', () => {
	test('should create empty history with configurable max depth', () => {
		const given = 'createStateHistory with maxDepth'
		const should = 'create empty history with specified max depth'

		const history = createStateHistory({ maxDepth: 100 })

		assert({
			given,
			should: 'should have empty snapshots array',
			actual: history.snapshots.length === 0,
			expected: true,
		})

		assert({
			given,
			should: 'should have correct maxDepth',
			actual: history.maxDepth === 100,
			expected: true,
		})
	})

	test('should default maxDepth if not provided', () => {
		const given = 'createStateHistory without maxDepth'
		const should = 'use default maxDepth'

		const history = createStateHistory()

		assert({
			given,
			should,
			actual: typeof history.maxDepth === 'number' && history.maxDepth > 0,
			expected: true,
		})
	})
})

describe('addSnapshot', () => {
	test('should add snapshot to history in chronological order', () => {
		const given = 'state history and snapshots'
		const should = 'store snapshots in chronological order'

		const history = createStateHistory({ maxDepth: 10 })
		const snapshot1 = createStateSnapshot({ state: createTestState(0), frame: 0 })
		const snapshot2 = createStateSnapshot({ state: createTestState(1), frame: 1 })
		const snapshot3 = createStateSnapshot({ state: createTestState(2), frame: 2 })

		const updatedHistory1 = addSnapshot(history, snapshot1)
		const updatedHistory2 = addSnapshot(updatedHistory1, snapshot2)
		const updatedHistory3 = addSnapshot(updatedHistory2, snapshot3)

		assert({
			given,
			should: 'should have 3 snapshots',
			actual: updatedHistory3.snapshots.length === 3,
			expected: true,
		})

		assert({
			given,
			should: 'first snapshot should be frame 0',
			actual: updatedHistory3.snapshots[0].frame === 0,
			expected: true,
		})

		assert({
			given,
			should: 'last snapshot should be frame 2',
			actual: updatedHistory3.snapshots[2].frame === 2,
			expected: true,
		})
	})

	test('should not mutate original history', () => {
		const given = 'state history'
		const should = 'not mutate original history'

		const history = createStateHistory({ maxDepth: 10 })
		const snapshot = createStateSnapshot({ state: createTestState(0), frame: 0 })

		const originalLength = history.snapshots.length
		addSnapshot(history, snapshot)

		assert({
			given,
			should,
			actual: history.snapshots.length === originalLength,
			expected: true,
		})
	})

	test('should remove oldest snapshots when maxDepth exceeded', () => {
		const given = 'history at maxDepth limit'
		const should = 'remove oldest snapshots (FIFO) when exceeded'

		const history = createStateHistory({ maxDepth: 3 })
		const snapshot1 = createStateSnapshot({ state: createTestState(0), frame: 0 })
		const snapshot2 = createStateSnapshot({ state: createTestState(1), frame: 1 })
		const snapshot3 = createStateSnapshot({ state: createTestState(2), frame: 2 })
		const snapshot4 = createStateSnapshot({ state: createTestState(3), frame: 3 })

		const history1 = addSnapshot(history, snapshot1)
		const history2 = addSnapshot(history1, snapshot2)
		const history3 = addSnapshot(history2, snapshot3)
		const history4 = addSnapshot(history3, snapshot4)

		assert({
			given,
			should: 'should maintain maxDepth',
			actual: history4.snapshots.length === 3,
			expected: true,
		})

		assert({
			given,
			should: 'should remove oldest snapshot (frame 0)',
			actual: history4.snapshots[0].frame === 1,
			expected: true,
		})

		assert({
			given,
			should: 'should keep newest snapshot (frame 3)',
			actual: history4.snapshots[2].frame === 3,
			expected: true,
		})
	})
})

describe('getSnapshotAtFrame', () => {
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

		const result = getSnapshotAtFrame(history3, 5)

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

		const result = getSnapshotAtFrame(history3, 7)

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

		const result = getSnapshotAtFrame(history1, 0)

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

		const result = getSnapshotAtFrame(history, 0)

		assert({
			given,
			should,
			actual: result === null,
			expected: true,
		})
	})
})

describe('clearHistory', () => {
	test('should remove all snapshots from history', () => {
		const given = 'history with snapshots'
		const should = 'remove all snapshots'

		const history = createStateHistory({ maxDepth: 10 })
		const snapshot1 = createStateSnapshot({ state: createTestState(0), frame: 0 })
		const snapshot2 = createStateSnapshot({ state: createTestState(1), frame: 1 })

		const history1 = addSnapshot(history, snapshot1)
		const history2 = addSnapshot(history1, snapshot2)
		const clearedHistory = clearHistory(history2)

		assert({
			given,
			should,
			actual: clearedHistory.snapshots.length === 0,
			expected: true,
		})
	})

	test('should not mutate original history', () => {
		const given = 'history with snapshots'
		const should = 'not mutate original history'

		const history = createStateHistory({ maxDepth: 10 })
		const snapshot = createStateSnapshot({ state: createTestState(0), frame: 0 })
		const history1 = addSnapshot(history, snapshot)

		clearHistory(history1)

		assert({
			given,
			should,
			actual: history1.snapshots.length === 1,
			expected: true,
		})
	})
})

describe('getHistoryRange', () => {
	test('should return snapshots between two frames', () => {
		const given = 'history with snapshots at frames 0, 5, 10, 15'
		const should = 'return snapshots in range'

		const history = createStateHistory({ maxDepth: 10 })
		const snapshot0 = createStateSnapshot({ state: createTestState(0), frame: 0 })
		const snapshot5 = createStateSnapshot({ state: createTestState(5), frame: 5 })
		const snapshot10 = createStateSnapshot({ state: createTestState(10), frame: 10 })
		const snapshot15 = createStateSnapshot({ state: createTestState(15), frame: 15 })

		const history1 = addSnapshot(history, snapshot0)
		const history2 = addSnapshot(history1, snapshot5)
		const history3 = addSnapshot(history2, snapshot10)
		const history4 = addSnapshot(history3, snapshot15)

		const range = getHistoryRange(history4, 5, 10)

		assert({
			given,
			should: 'should return 2 snapshots',
			actual: range.length === 2,
			expected: true,
		})

		assert({
			given,
			should: 'should include frame 5',
			actual: range.some((s) => s.frame === 5),
			expected: true,
		})

		assert({
			given,
			should: 'should include frame 10',
			actual: range.some((s) => s.frame === 10),
			expected: true,
		})
	})

	test('should return empty array if no snapshots in range', () => {
		const given = 'history with snapshots outside range'
		const should = 'return empty array'

		const history = createStateHistory({ maxDepth: 10 })
		const snapshot0 = createStateSnapshot({ state: createTestState(0), frame: 0 })
		const snapshot10 = createStateSnapshot({ state: createTestState(10), frame: 10 })

		const history1 = addSnapshot(history, snapshot0)
		const history2 = addSnapshot(history1, snapshot10)

		const range = getHistoryRange(history2, 20, 30)

		assert({
			given,
			should,
			actual: range.length === 0,
			expected: true,
		})
	})
})

describe('getLatestSnapshot', () => {
	test('should return most recent snapshot', () => {
		const given = 'history with multiple snapshots'
		const should = 'return most recent snapshot'

		const history = createStateHistory({ maxDepth: 10 })
		const snapshot0 = createStateSnapshot({ state: createTestState(0), frame: 0 })
		const snapshot5 = createStateSnapshot({ state: createTestState(5), frame: 5 })
		const snapshot10 = createStateSnapshot({ state: createTestState(10), frame: 10 })

		const history1 = addSnapshot(history, snapshot0)
		const history2 = addSnapshot(history1, snapshot5)
		const history3 = addSnapshot(history2, snapshot10)

		const latest = getLatestSnapshot(history3)

		assert({
			given,
			should,
			actual: latest !== null && latest.frame === 10,
			expected: true,
		})
	})

	test('should return null if history is empty', () => {
		const given = 'empty history'
		const should = 'return null'

		const history = createStateHistory({ maxDepth: 10 })

		const latest = getLatestSnapshot(history)

		assert({
			given,
			should,
			actual: latest === null,
			expected: true,
		})
	})
})

describe('getSnapshotCount', () => {
	test('should return total number of snapshots', () => {
		const given = 'history with snapshots'
		const should = 'return snapshot count'

		const history = createStateHistory({ maxDepth: 10 })
		const snapshot1 = createStateSnapshot({ state: createTestState(0), frame: 0 })
		const snapshot2 = createStateSnapshot({ state: createTestState(1), frame: 1 })
		const snapshot3 = createStateSnapshot({ state: createTestState(2), frame: 2 })

		const history1 = addSnapshot(history, snapshot1)
		const history2 = addSnapshot(history1, snapshot2)
		const history3 = addSnapshot(history2, snapshot3)

		const count = getSnapshotCount(history3)

		assert({
			given,
			should,
			actual: count === 3,
			expected: true,
		})
	})

	test('should return 0 for empty history', () => {
		const given = 'empty history'
		const should = 'return 0'

		const history = createStateHistory({ maxDepth: 10 })

		const count = getSnapshotCount(history)

		assert({
			given,
			should,
			actual: count === 0,
			expected: true,
		})
	})
})

