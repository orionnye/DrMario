import { describe, test } from 'vitest'
import assert from 'riteway'
import { createBoard } from './board'
import { getCell } from './get-cell'
import { EMPTY, VIRUS_RED } from './cell-state'

describe('getCell', () => {
	test('should return cell state at valid coordinates', () => {
		const given = 'valid coordinates (0, 0)'
		const should = 'return cell state at that position'

		const board = createBoard({ width: 3, height: 2 })
		const actual = getCell({ board, x: 0, y: 0 })
		const expected = EMPTY

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return cell state at valid coordinates in middle of board', () => {
		const given = 'valid coordinates (2, 1)'
		const should = 'return cell state at that position'

		const board = createBoard({ width: 4, height: 3 })
		const actual = getCell({ board, x: 2, y: 1 })
		const expected = EMPTY

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should not mutate board', () => {
		const given = 'board and coordinates'
		const should = 'not mutate the original board'

		const board = createBoard({ width: 3, height: 2 })
		const originalCells = [...board.cells]
		getCell({ board, x: 0, y: 0 })
		const actual = board.cells
		const expected = originalCells

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should throw error for coordinates outside board bounds (x too high)', () => {
		const given = 'coordinates with x outside board bounds'
		const should = 'throw error'

		const board = createBoard({ width: 3, height: 2 })
		const actual = () => getCell({ board, x: 3, y: 0 })
		const expected = 'Error'

		assert({
			given,
			should,
			actual: actual.constructor.name,
			expected,
		})
	})

	test('should throw error for coordinates outside board bounds (y too high)', () => {
		const given = 'coordinates with y outside board bounds'
		const should = 'throw error'

		const board = createBoard({ width: 3, height: 2 })
		const actual = () => getCell({ board, x: 0, y: 2 })
		const expected = 'Error'

		assert({
			given,
			should,
			actual: actual.constructor.name,
			expected,
		})
	})

	test('should throw error for negative x coordinate', () => {
		const given = 'coordinates with negative x'
		const should = 'throw error'

		const board = createBoard({ width: 3, height: 2 })
		const actual = () => getCell({ board, x: -1, y: 0 })
		const expected = 'Error'

		assert({
			given,
			should,
			actual: actual.constructor.name,
			expected,
		})
	})

	test('should throw error for negative y coordinate', () => {
		const given = 'coordinates with negative y'
		const should = 'throw error'

		const board = createBoard({ width: 3, height: 2 })
		const actual = () => getCell({ board, x: 0, y: -1 })
		const expected = 'Error'

		assert({
			given,
			should,
			actual: actual.constructor.name,
			expected,
		})
	})
})

