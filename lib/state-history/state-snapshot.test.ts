import { describe, test } from 'vitest'
import assert from 'riteway'
import type { GameState } from './game-state'
import { createStateSnapshot } from './state-snapshot'
import { createPill } from '../pill/pill'
import { createFallingPill } from '../pill-falling/pill-fall-state'

describe('createStateSnapshot', () => {
	test('should create deep copy snapshot without mutating original state', () => {
		const given = 'game state with falling and locked pills'
		const should = 'create deep copy snapshot without mutating original'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 1,
			y: 0,
			orientation: 'HORIZONTAL',
		})

		const fallingPill = createFallingPill({
			pill,
			frameCount: 10,
			fallSpeed: 30,
		})

		const lockedPill = createPill({
			colors: ['YELLOW', 'RED'],
			x: 3,
			y: 10,
			orientation: 'VERTICAL',
		})

		const state: GameState = {
			fallingPills: [fallingPill],
			lockedPills: [lockedPill],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 42,
		}

		const snapshot = createStateSnapshot({ state, frame: 42 })

		// Verify snapshot is different object
		assert({
			given,
			should: 'snapshot should be different object reference',
			actual: snapshot !== state,
			expected: true,
		})

		// Verify arrays are different references
		assert({
			given,
			should: 'fallingPills array should be different reference',
			actual: snapshot.fallingPills !== state.fallingPills,
			expected: true,
		})

		assert({
			given,
			should: 'lockedPills array should be different reference',
			actual: snapshot.lockedPills !== state.lockedPills,
			expected: true,
		})

		// Verify original state unchanged
		assert({
			given,
			should: 'original state should remain unchanged',
			actual:
				state.fallingPills.length === 1 &&
				state.lockedPills.length === 1 &&
				state.seed === 12345,
			expected: true,
		})
	})

	test('should include frame number from provided frame', () => {
		const given = 'game state and frame number'
		const should = 'include frame number in snapshot'

		const state: GameState = {
			fallingPills: [],
			lockedPills: [],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 100,
		}

		const snapshot = createStateSnapshot({ state, frame: 42 })

		assert({
			given,
			should,
			actual: snapshot.frame === 42,
			expected: true,
		})
	})

	test('should include timestamp for debugging', () => {
		const given = 'game state'
		const should = 'include timestamp in snapshot'

		const state: GameState = {
			fallingPills: [],
			lockedPills: [],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 0,
		}

		const beforeTime = Date.now()
		const snapshot = createStateSnapshot({ state, frame: 0 })
		const afterTime = Date.now()

		assert({
			given,
			should: 'timestamp should be a number',
			actual: typeof snapshot.timestamp === 'number',
			expected: true,
		})

		assert({
			given,
			should: 'timestamp should be within reasonable range',
			actual: snapshot.timestamp >= beforeTime && snapshot.timestamp <= afterTime,
			expected: true,
		})
	})

	test('should handle all state properties', () => {
		const given = 'game state with all properties'
		const should = 'include all properties in snapshot'

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
			lockDelayFrames: 60,
			landedAtFrame: 10,
		})

		const lockedPill = createPill({
			colors: ['YELLOW', 'RED'],
			x: 3,
			y: 10,
			orientation: 'VERTICAL',
		})

		const state: GameState = {
			fallingPills: [fallingPill],
			lockedPills: [lockedPill],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 42,
		}

		const snapshot = createStateSnapshot({ state, frame: 42 })

		assert({
			given,
			should: 'should include fallingPills',
			actual: snapshot.fallingPills.length === 1,
			expected: true,
		})

		assert({
			given,
			should: 'should include lockedPills',
			actual: snapshot.lockedPills.length === 1,
			expected: true,
		})

		assert({
			given,
			should: 'should include seed',
			actual: snapshot.seed === 12345,
			expected: true,
		})

		assert({
			given,
			should: 'should include minY',
			actual: snapshot.minY === 5,
			expected: true,
		})

		assert({
			given,
			should: 'should include fallSpeed',
			actual: snapshot.fallSpeed === 30,
			expected: true,
		})

		// Verify nested properties are deep copied
		assert({
			given,
			should: 'fallingPill should be deep copied',
			actual:
				snapshot.fallingPills[0] !== state.fallingPills[0] &&
				snapshot.fallingPills[0].x === state.fallingPills[0].x &&
				snapshot.fallingPills[0].frameCount === state.fallingPills[0].frameCount,
			expected: true,
		})

		assert({
			given,
			should: 'lockedPill should be deep copied',
			actual:
				snapshot.lockedPills[0] !== state.lockedPills[0] &&
				snapshot.lockedPills[0].x === state.lockedPills[0].x,
			expected: true,
		})
	})

	test('should handle empty state', () => {
		const given = 'empty game state'
		const should = 'create snapshot with empty arrays'

		const state: GameState = {
			fallingPills: [],
			lockedPills: [],
			seed: 0,
			minY: 0,
			fallSpeed: 30,
			frame: 0,
		}

		const snapshot = createStateSnapshot({ state, frame: 0 })

		assert({
			given,
			should: 'should have empty fallingPills array',
			actual: snapshot.fallingPills.length === 0,
			expected: true,
		})

		assert({
			given,
			should: 'should have empty lockedPills array',
			actual: snapshot.lockedPills.length === 0,
			expected: true,
		})

		assert({
			given,
			should: 'should include all properties',
			actual:
				snapshot.seed === 0 &&
				snapshot.minY === 0 &&
				snapshot.fallSpeed === 30 &&
				snapshot.frame === 0,
			expected: true,
		})
	})
})

