import { describe, test } from 'vitest'
import assert from 'riteway'
import { createBoard } from './board'
import { isValidPosition } from './is-valid-position'

describe('isValidPosition', () => {
	test('should return true for coordinates within board bounds', () => {
		const given = 'coordinates within board bounds'
		const should = 'return true'

		const board = createBoard({ width: 3, height: 2 })
		const actual = isValidPosition({ board, x: 1, y: 0 })
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return true for coordinates at board edges', () => {
		const given = 'coordinates at board edges'
		const should = 'return true'

		const board = createBoard({ width: 3, height: 2 })
		const actual1 = isValidPosition({ board, x: 0, y: 0 })
		const actual2 = isValidPosition({ board, x: 2, y: 1 })
		const expected = true

		assert({
			given,
			should: 'return true for top-left corner',
			actual: actual1,
			expected,
		})

		assert({
			given,
			should: 'return true for bottom-right corner',
			actual: actual2,
			expected,
		})
	})

	test('should return false for coordinates outside board bounds (x too high)', () => {
		const given = 'coordinates outside board bounds (x too high)'
		const should = 'return false'

		const board = createBoard({ width: 3, height: 2 })
		const actual = isValidPosition({ board, x: 3, y: 0 })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false for coordinates outside board bounds (y too high)', () => {
		const given = 'coordinates outside board bounds (y too high)'
		const should = 'return false'

		const board = createBoard({ width: 3, height: 2 })
		const actual = isValidPosition({ board, x: 0, y: 2 })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false for negative x coordinate', () => {
		const given = 'negative x coordinate'
		const should = 'return false'

		const board = createBoard({ width: 3, height: 2 })
		const actual = isValidPosition({ board, x: -1, y: 0 })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false for negative y coordinate', () => {
		const given = 'negative y coordinate'
		const should = 'return false'

		const board = createBoard({ width: 3, height: 2 })
		const actual = isValidPosition({ board, x: 0, y: -1 })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

