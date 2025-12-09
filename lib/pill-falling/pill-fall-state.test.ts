import { describe, test } from 'vitest'
import assert from 'riteway'
import { createPill } from '../pill/pill'
import { createFallingPill, type FallingPill } from './pill-fall-state'

describe('FallingPill', () => {
	test('should include frame counter for fall timing', () => {
		const given = 'pill entity'
		const should = 'include frame counter for fall timing'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 0,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 0, fallSpeed: 30 })
		const actual = typeof fallingPill.frameCount === 'number'
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should support configurable fall speed (frames per cell)', () => {
		const given = 'pill entity'
		const should = 'support configurable fall speed'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 0,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 0, fallSpeed: 45 })
		const actual = fallingPill.fallSpeed
		const expected = 45

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should track when pill last moved', () => {
		const given = 'pill fall state'
		const should = 'track when pill last moved'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 15, fallSpeed: 30 })
		const actual = fallingPill.frameCount
		const expected = 15

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should include all original pill properties', () => {
		const given = 'falling pill creation'
		const should = 'include all original pill properties'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
			rotation: 90,
		})
		const fallingPill = createFallingPill({ pill, frameCount: 0, fallSpeed: 30 })
		const actual =
			fallingPill.colors[0] === 'RED' &&
			fallingPill.colors[1] === 'BLUE' &&
			fallingPill.x === 3 &&
			fallingPill.y === 5 &&
			fallingPill.orientation === 'HORIZONTAL' &&
			fallingPill.rotation === 90
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

