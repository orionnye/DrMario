import { describe, test } from 'vitest'
import assert from 'riteway'
import { createBoard } from './board'
import { EMPTY } from './cell-state'

describe('createBoard', () => {
	test('should create board with all cells initialized to EMPTY', () => {
		const given = 'width 3 and height 2'
		const should = 'create board with all cells initialized to EMPTY'

		const board = createBoard({ width: 3, height: 2 })
		const actual = board.cells.every((cell) => cell === EMPTY)
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should create board with correct dimensions', () => {
		const given = 'width 4 and height 5'
		const should = 'create board with 20 cells (4 * 5)'

		const board = createBoard({ width: 4, height: 5 })
		const actual = board.cells.length
		const expected = 20

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should throw error for zero width', () => {
		const given = 'width 0 and height 5'
		const should = 'throw error'

		const actual = () => createBoard({ width: 0, height: 5 })
		const expected = 'Error'

		assert({
			given,
			should,
			actual: actual.constructor.name,
			expected,
		})
	})

	test('should throw error for negative width', () => {
		const given = 'width -1 and height 5'
		const should = 'throw error'

		const actual = () => createBoard({ width: -1, height: 5 })
		const expected = 'Error'

		assert({
			given,
			should,
			actual: actual.constructor.name,
			expected,
		})
	})

	test('should throw error for zero height', () => {
		const given = 'width 5 and height 0'
		const should = 'throw error'

		const actual = () => createBoard({ width: 5, height: 0 })
		const expected = 'Error'

		assert({
			given,
			should,
			actual: actual.constructor.name,
			expected,
		})
	})

	test('should throw error for negative height', () => {
		const given = 'width 5 and height -1'
		const should = 'throw error'

		const actual = () => createBoard({ width: 5, height: -1 })
		const expected = 'Error'

		assert({
			given,
			should,
			actual: actual.constructor.name,
			expected,
		})
	})

	test('should return immutable board structure', () => {
		const given = 'a created board'
		const should = 'return structure with width, height, and cells properties'

		const board = createBoard({ width: 3, height: 2 })
		const actual =
			typeof board.width === 'number' &&
			typeof board.height === 'number' &&
			Array.isArray(board.cells)
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

