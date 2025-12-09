import { describe, test } from 'vitest'
import assert from 'riteway'
import { createPill } from '../pill/pill'
import { createFallingPill } from './pill-fall-state'
import { shouldPillFall } from './should-pill-fall'

describe('shouldPillFall', () => {
	test('should return true when frames elapsed', () => {
		const given = 'pill frame count and fall speed with frames elapsed'
		const should = 'return true'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 30, fallSpeed: 30 })
		const actual = shouldPillFall(fallingPill)
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false when frames not elapsed', () => {
		const given = 'pill frame count and fall speed with frames not elapsed'
		const should = 'return false'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 15, fallSpeed: 30 })
		const actual = shouldPillFall(fallingPill)
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return true when frame count is multiple of fall speed', () => {
		const given = 'pill with frame count multiple of fall speed'
		const should = 'return true'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 60, fallSpeed: 30 })
		const actual = shouldPillFall(fallingPill)
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false when frame count is not multiple of fall speed', () => {
		const given = 'pill with frame count not multiple of fall speed'
		const should = 'return false'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 59, fallSpeed: 30 })
		const actual = shouldPillFall(fallingPill)
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should not mutate pill', () => {
		const given = 'shouldPillFall check'
		const should = 'not mutate pill'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 30, fallSpeed: 30 })
		const originalFrameCount = fallingPill.frameCount
		shouldPillFall(fallingPill)
		const actual = fallingPill.frameCount
		const expected = originalFrameCount

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

