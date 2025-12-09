import { describe, test } from 'vitest'
import assert from 'riteway'
import { createPill } from '../pill/pill'
import { createFallingPill } from './pill-fall-state'
import { updatePillPosition } from './update-pill-position'

describe('updatePillPosition', () => {
	test('should return new pill one cell lower when fall speed elapsed', () => {
		const given = 'pill and frame count with fall speed elapsed'
		const should = 'return new pill one cell lower'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 30, fallSpeed: 30 })
		const updated = updatePillPosition({ fallingPill, deltaFrames: 1 })
		const actual = updated.y
		const expected = 6

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return unchanged pill if fall speed not elapsed', () => {
		const given = 'pill and frame count with fall speed not elapsed'
		const should = 'return unchanged pill'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 15, fallSpeed: 30 })
		const updated = updatePillPosition({ fallingPill, deltaFrames: 1 })
		const actual = updated.y
		const expected = 5

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should increment frame counter', () => {
		const given = 'pill position update'
		const should = 'increment frame counter'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 15, fallSpeed: 30 })
		const updated = updatePillPosition({ fallingPill, deltaFrames: 5 })
		const actual = updated.frameCount
		const expected = 20

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should not mutate original pill', () => {
		const given = 'updatePillPosition operation'
		const should = 'not mutate the original pill'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 30, fallSpeed: 30 })
		const originalY = fallingPill.y
		updatePillPosition({ fallingPill, deltaFrames: 1 })
		const actual = fallingPill.y
		const expected = originalY

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should handle multiple fall cycles', () => {
		const given = 'pill with multiple fall cycles'
		const should = 'fall multiple cells when multiple cycles elapsed'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 0,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 0, fallSpeed: 10 })
		// Update through 3 fall cycles (30 frames)
		const afterFirst = updatePillPosition({ fallingPill, deltaFrames: 10 })
		const afterSecond = updatePillPosition({ fallingPill: afterFirst, deltaFrames: 10 })
		const afterThird = updatePillPosition({ fallingPill: afterSecond, deltaFrames: 10 })
		const actual = afterThird.y
		const expected = 3

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

