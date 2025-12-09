import { describe, test } from 'vitest'
import assert from 'riteway'
import { createPill } from './pill'
import { rotatePill } from './rotate-pill'

describe('rotatePill', () => {
	test('should return new pill with updated rotation', () => {
		const given = 'pill and rotation direction'
		const should = 'return new pill with updated rotation'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 0,
			orientation: 'HORIZONTAL',
		})
		const rotated = rotatePill(pill, 'CLOCKWISE')
		const actual = rotated.rotation
		const expected = 90

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should cycle through 0, 90, 180, 270 degrees clockwise', () => {
		const given = 'rotation operation'
		const should = 'cycle through 0, 90, 180, 270 degrees'

		const pill0 = createPill({
			colors: ['RED', 'BLUE'],
			x: 0,
			y: 0,
			orientation: 'HORIZONTAL',
			rotation: 0,
		})
		const pill90 = rotatePill(pill0, 'CLOCKWISE')
		const pill180 = rotatePill(pill90, 'CLOCKWISE')
		const pill270 = rotatePill(pill180, 'CLOCKWISE')
		const pill360 = rotatePill(pill270, 'CLOCKWISE')

		assert({
			given,
			should: 'rotate 0 to 90',
			actual: pill90.rotation,
			expected: 90,
		})

		assert({
			given,
			should: 'rotate 90 to 180',
			actual: pill180.rotation,
			expected: 180,
		})

		assert({
			given,
			should: 'rotate 180 to 270',
			actual: pill270.rotation,
			expected: 270,
		})

		assert({
			given,
			should: 'rotate 270 to 0',
			actual: pill360.rotation,
			expected: 0,
		})
	})

	test('should cycle through 0, 270, 180, 90 degrees counter-clockwise', () => {
		const given = 'counter-clockwise rotation'
		const should = 'cycle through 0, 270, 180, 90 degrees'

		const pill0 = createPill({
			colors: ['RED', 'BLUE'],
			x: 0,
			y: 0,
			orientation: 'HORIZONTAL',
			rotation: 0,
		})
		const pill270 = rotatePill(pill0, 'COUNTER_CLOCKWISE')
		const pill180 = rotatePill(pill270, 'COUNTER_CLOCKWISE')
		const pill90 = rotatePill(pill180, 'COUNTER_CLOCKWISE')
		const pill0Again = rotatePill(pill90, 'COUNTER_CLOCKWISE')

		assert({
			given,
			should: 'rotate 0 to 270',
			actual: pill270.rotation,
			expected: 270,
		})

		assert({
			given,
			should: 'rotate 270 to 180',
			actual: pill180.rotation,
			expected: 180,
		})

		assert({
			given,
			should: 'rotate 180 to 90',
			actual: pill90.rotation,
			expected: 90,
		})

		assert({
			given,
			should: 'rotate 90 to 0',
			actual: pill0Again.rotation,
			expected: 0,
		})
	})

	test('should not mutate original pill', () => {
		const given = 'rotation operation'
		const should = 'not mutate the original pill'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 0,
			orientation: 'HORIZONTAL',
			rotation: 0,
		})
		const originalRotation = pill.rotation
		rotatePill(pill, 'CLOCKWISE')
		const actual = pill.rotation
		const expected = originalRotation

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should update orientation based on rotation state', () => {
		const given = 'rotation'
		const should = 'update orientation based on rotation state'

		const horizontalPill = createPill({
			colors: ['RED', 'BLUE'],
			x: 0,
			y: 0,
			orientation: 'HORIZONTAL',
			rotation: 0,
		})
		const rotated90 = rotatePill(horizontalPill, 'CLOCKWISE')
		const rotated180 = rotatePill(rotated90, 'CLOCKWISE')

		assert({
			given,
			should: 'change HORIZONTAL to VERTICAL at 90 degrees',
			actual: rotated90.orientation,
			expected: 'VERTICAL',
		})

		assert({
			given,
			should: 'change VERTICAL back to HORIZONTAL at 180 degrees',
			actual: rotated180.orientation,
			expected: 'HORIZONTAL',
		})
	})
})

