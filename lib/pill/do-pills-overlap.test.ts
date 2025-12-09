import { describe, test } from 'vitest'
import assert from 'riteway'
import { createPill } from './pill'
import { doPillsOverlap } from './do-pills-overlap'

describe('doPillsOverlap', () => {
	test('should return false if pills do not overlap', () => {
		const given = 'two pills at different positions'
		const should = 'return false'

		const pill1 = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const pill2 = createPill({
			colors: ['YELLOW', 'RED'],
			x: 5,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const actual = doPillsOverlap({ pill1, pill2 })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return true if pills overlap on first cell', () => {
		const given = 'two pills at same position'
		const should = 'return true'

		const pill1 = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const pill2 = createPill({
			colors: ['YELLOW', 'RED'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const actual = doPillsOverlap({ pill1, pill2 })
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return true if horizontal pill overlaps with second cell of another pill', () => {
		const given = 'horizontal pill overlapping second cell'
		const should = 'return true'

		const pill1 = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
			rotation: 0, // Cells at (3,5) and (4,5)
		})
		const pill2 = createPill({
			colors: ['YELLOW', 'RED'],
			x: 4,
			y: 5,
			orientation: 'HORIZONTAL',
			rotation: 0, // Cells at (4,5) and (5,5)
		})
		const actual = doPillsOverlap({ pill1, pill2 })
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return true if vertical pill overlaps with second cell of another pill', () => {
		const given = 'vertical pill overlapping second cell'
		const should = 'return true'

		const pill1 = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'VERTICAL',
			rotation: 90, // Cells at (3,5) and (3,6)
		})
		const pill2 = createPill({
			colors: ['YELLOW', 'RED'],
			x: 3,
			y: 6,
			orientation: 'VERTICAL',
			rotation: 90, // Cells at (3,6) and (3,7)
		})
		const actual = doPillsOverlap({ pill1, pill2 })
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false if pills are adjacent but not overlapping', () => {
		const given = 'two horizontal pills adjacent horizontally'
		const should = 'return false'

		const pill1 = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
			rotation: 0, // Cells at (3,5) and (4,5)
		})
		const pill2 = createPill({
			colors: ['YELLOW', 'RED'],
			x: 5,
			y: 5,
			orientation: 'HORIZONTAL',
			rotation: 0, // Cells at (5,5) and (6,5)
		})
		const actual = doPillsOverlap({ pill1, pill2 })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false if pills are adjacent but not overlapping vertically', () => {
		const given = 'two vertical pills adjacent vertically'
		const should = 'return false'

		const pill1 = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'VERTICAL',
			rotation: 90, // Cells at (3,5) and (3,6)
		})
		const pill2 = createPill({
			colors: ['YELLOW', 'RED'],
			x: 3,
			y: 7,
			orientation: 'VERTICAL',
			rotation: 90, // Cells at (3,7) and (3,8)
		})
		const actual = doPillsOverlap({ pill1, pill2 })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should not mutate pills', () => {
		const given = 'doPillsOverlap check'
		const should = 'not mutate pills'

		const pill1 = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const pill2 = createPill({
			colors: ['YELLOW', 'RED'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const originalPill1X = pill1.x
		const originalPill1Y = pill1.y
		const originalPill2X = pill2.x
		const originalPill2Y = pill2.y
		doPillsOverlap({ pill1, pill2 })
		const actual =
			pill1.x === originalPill1X &&
			pill1.y === originalPill1Y &&
			pill2.x === originalPill2X &&
			pill2.y === originalPill2Y
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

