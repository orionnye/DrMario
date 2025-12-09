import { describe, test } from 'vitest'
import assert from 'riteway'
import { createPill } from '../pill/pill'
import { createFallingPill } from './pill-fall-state'
import { shouldLockPill } from './pill-lock-delay'

describe('shouldLockPill', () => {
	test('should return false when pill has not landed', () => {
		const given = 'pill that has not landed'
		const should = 'return false'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({
			pill,
			frameCount: 0,
			fallSpeed: 30,
			lockDelayFrames: 60,
		})
		const actual = shouldLockPill({ fallingPill, currentFrame: 0 })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false when lock delay not elapsed', () => {
		const given = 'pill has landed but lock delay not elapsed'
		const should = 'return false'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({
			pill,
			frameCount: 0,
			fallSpeed: 30,
			lockDelayFrames: 60,
			landedAtFrame: 100,
		})
		const actual = shouldLockPill({ fallingPill, currentFrame: 150 })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return true when lock delay elapsed', () => {
		const given = 'pill has landed and lock delay elapsed'
		const should = 'return true'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({
			pill,
			frameCount: 0,
			fallSpeed: 30,
			lockDelayFrames: 60,
			landedAtFrame: 100,
		})
		const actual = shouldLockPill({ fallingPill, currentFrame: 161 })
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return true when exactly lock delay elapsed', () => {
		const given = 'pill has landed and exactly lock delay elapsed'
		const should = 'return true'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({
			pill,
			frameCount: 0,
			fallSpeed: 30,
			lockDelayFrames: 60,
			landedAtFrame: 100,
		})
		const actual = shouldLockPill({ fallingPill, currentFrame: 160 })
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should be configurable frames count', () => {
		const given = 'pill with different lock delay frames'
		const should = 'use configured lock delay'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({
			pill,
			frameCount: 0,
			fallSpeed: 30,
			lockDelayFrames: 120,
			landedAtFrame: 100,
		})
		const actual = shouldLockPill({ fallingPill, currentFrame: 220 })
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false when landedAtFrame is undefined', () => {
		const given = 'pill without landedAtFrame'
		const should = 'return false'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({
			pill,
			frameCount: 0,
			fallSpeed: 30,
			lockDelayFrames: 60,
		})
		const actual = shouldLockPill({ fallingPill, currentFrame: 200 })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

