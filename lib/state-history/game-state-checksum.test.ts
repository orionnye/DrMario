import { describe, test } from 'vitest'
import assert from 'riteway'
import type { GameState } from './game-state'
import { generateStateChecksum } from './game-state-checksum'
import { createPill } from '../pill/pill'
import { createFallingPill } from '../pill-falling/pill-fall-state'

describe('generateStateChecksum', () => {
	test('should generate deterministic hash for same state', () => {
		const given = 'same game state'
		const should = 'produce same hash'

		const state: GameState = {
			fallingPills: [],
			lockedPills: [],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 0,
		}

		const hash1 = generateStateChecksum(state)
		const hash2 = generateStateChecksum(state)

		assert({
			given,
			should,
			actual: hash1 === hash2,
			expected: true,
		})
	})

	test('should generate different hash for different states', () => {
		const given = 'different game states'
		const should = 'produce different hashes'

		const state1: GameState = {
			fallingPills: [],
			lockedPills: [],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 0,
		}

		const state2: GameState = {
			fallingPills: [],
			lockedPills: [],
			seed: 12346,
			minY: 5,
			fallSpeed: 30,
			frame: 0,
		}

		const hash1 = generateStateChecksum(state1)
		const hash2 = generateStateChecksum(state2)

		assert({
			given,
			should,
			actual: hash1 !== hash2,
			expected: true,
		})
	})

	test('should generate different hash when fallingPills differ', () => {
		const given = 'states with different falling pills'
		const should = 'produce different hashes'

		const pill1 = createPill({
			colors: ['RED', 'BLUE'],
			x: 1,
			y: 0,
			orientation: 'HORIZONTAL',
		})

		const fallingPill1 = createFallingPill({
			pill: pill1,
			frameCount: 0,
			fallSpeed: 30,
		})

		const state1: GameState = {
			fallingPills: [fallingPill1],
			lockedPills: [],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 0,
		}

		const state2: GameState = {
			fallingPills: [],
			lockedPills: [],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 0,
		}

		const hash1 = generateStateChecksum(state1)
		const hash2 = generateStateChecksum(state2)

		assert({
			given,
			should,
			actual: hash1 !== hash2,
			expected: true,
		})
	})

	test('should generate different hash when lockedPills differ', () => {
		const given = 'states with different locked pills'
		const should = 'produce different hashes'

		const lockedPill1 = createPill({
			colors: ['RED', 'BLUE'],
			x: 1,
			y: 10,
			orientation: 'HORIZONTAL',
		})

		const state1: GameState = {
			fallingPills: [],
			lockedPills: [lockedPill1],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 0,
		}

		const state2: GameState = {
			fallingPills: [],
			lockedPills: [],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 0,
		}

		const hash1 = generateStateChecksum(state1)
		const hash2 = generateStateChecksum(state2)

		assert({
			given,
			should,
			actual: hash1 !== hash2,
			expected: true,
		})
	})

	test('should generate different hash when frame differs', () => {
		const given = 'states with different frame numbers'
		const should = 'produce different hashes'

		const state1: GameState = {
			fallingPills: [],
			lockedPills: [],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 0,
		}

		const state2: GameState = {
			fallingPills: [],
			lockedPills: [],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 1,
		}

		const hash1 = generateStateChecksum(state1)
		const hash2 = generateStateChecksum(state2)

		assert({
			given,
			should,
			actual: hash1 !== hash2,
			expected: true,
		})
	})

	test('should generate hash that is serializable string', () => {
		const given = 'game state'
		const should = 'produce serializable string hash'

		const state: GameState = {
			fallingPills: [],
			lockedPills: [],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 0,
		}

		const hash = generateStateChecksum(state)

		assert({
			given,
			should,
			actual: typeof hash === 'string' && hash.length > 0,
			expected: true,
		})
	})

	test('should not mutate original state', () => {
		const given = 'generateStateChecksum operation'
		const should = 'not mutate original state'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 1,
			y: 0,
			orientation: 'HORIZONTAL',
		})

		const fallingPill = createFallingPill({
			pill,
			frameCount: 0,
			fallSpeed: 30,
		})

		const state: GameState = {
			fallingPills: [fallingPill],
			lockedPills: [],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 0,
		}

		const originalFallingPillsLength = state.fallingPills.length
		const originalSeed = state.seed

		generateStateChecksum(state)

		assert({
			given,
			should,
			actual:
				state.fallingPills.length === originalFallingPillsLength &&
				state.seed === originalSeed,
			expected: true,
		})
	})

	test('should generate hash for empty state', () => {
		const given = 'empty game state'
		const should = 'generate valid hash'

		const state: GameState = {
			fallingPills: [],
			lockedPills: [],
			seed: 0,
			minY: 0,
			fallSpeed: 30,
			frame: 0,
		}

		const hash = generateStateChecksum(state)

		assert({
			given,
			should,
			actual: typeof hash === 'string' && hash.length > 0,
			expected: true,
		})
	})
})

