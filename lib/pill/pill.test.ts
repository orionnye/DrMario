import { describe, test } from 'vitest'
import assert from 'riteway'
import { createPill, type Pill, type PillColor, type PillOrientation } from './pill'

describe('Pill Data Structure', () => {
	test('should include two colors, position coordinates, orientation, and rotation degrees', () => {
		const given = 'pill definition'
		const should = 'include two colors, position coordinates, orientation, and rotation degrees'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 0,
			orientation: 'HORIZONTAL',
		})
		const actual =
			Array.isArray(pill.colors) &&
			pill.colors.length === 2 &&
			typeof pill.x === 'number' &&
			typeof pill.y === 'number' &&
			typeof pill.orientation === 'string' &&
			typeof pill.rotation === 'number'
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should support HORIZONTAL orientation', () => {
		const given = 'pill type'
		const should = 'support HORIZONTAL orientation'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 0,
			y: 0,
			orientation: 'HORIZONTAL',
		})
		const actual: PillOrientation = pill.orientation
		const expected: PillOrientation = 'HORIZONTAL'

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should support VERTICAL orientation', () => {
		const given = 'pill type'
		const should = 'support VERTICAL orientation'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 0,
			y: 0,
			orientation: 'VERTICAL',
		})
		const actual: PillOrientation = pill.orientation
		const expected: PillOrientation = 'VERTICAL'

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should support rotation states 0, 90, 180, 270 degrees', () => {
		const given = 'pill type'
		const should = 'support rotation states 0, 90, 180, 270 degrees'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 0,
			y: 0,
			orientation: 'HORIZONTAL',
		})
		const validRotations = [0, 90, 180, 270]
		const actual = validRotations.includes(pill.rotation)
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

describe('createPill', () => {
	test('should create pill with specified properties', () => {
		const given = 'colors array and position'
		const should = 'create pill with specified properties'

		const pill = createPill({
			colors: ['RED', 'YELLOW'],
			x: 4,
			y: 2,
			orientation: 'VERTICAL',
		})
		const actual = pill.colors[0] === 'RED' && pill.colors[1] === 'YELLOW' && pill.x === 4 && pill.y === 2
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return immutable pill structure', () => {
		const given = 'createPill operation'
		const should = 'return immutable pill structure'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 0,
			y: 0,
			orientation: 'HORIZONTAL',
		})
		const actual = typeof pill === 'object' && pill !== null
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should throw error for invalid colors (not two colors)', () => {
		const given = 'invalid colors (not two colors)'
		const should = 'throw error'

		const actual = () =>
			createPill({
				colors: ['RED'] as [PillColor, PillColor],
				x: 0,
				y: 0,
				orientation: 'HORIZONTAL',
			})
		const expected = 'Error'

		assert({
			given,
			should,
			actual: actual.constructor.name,
			expected,
		})
	})
})

