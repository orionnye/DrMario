import { describe, test } from 'vitest'
import assert from 'riteway'
import { createBoard } from './board'
import { setCell } from './set-cell'
import { getCell } from './get-cell'
import { EMPTY, VIRUS_RED, PILL_BLUE } from './cell-state'

describe('setCell', () => {
	test('should return new board with updated cell', () => {
		const given = 'valid coordinates and state'
		const should = 'return new board with updated cell'

		const board = createBoard({ width: 3, height: 2 })
		const newBoard = setCell({ board, x: 1, y: 0, state: VIRUS_RED })
		const actual = getCell({ board: newBoard, x: 1, y: 0 })
		const expected = VIRUS_RED

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should not mutate original board', () => {
		const given = 'setCell operation'
		const should = 'not mutate the original board'

		const board = createBoard({ width: 3, height: 2 })
		const originalCell = getCell({ board, x: 1, y: 0 })
		setCell({ board, x: 1, y: 0, state: VIRUS_RED })
		const actual = getCell({ board, x: 1, y: 0 })
		const expected = originalCell

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should update multiple cells independently', () => {
		const given = 'multiple setCell operations'
		const should = 'update each cell independently'

		const board = createBoard({ width: 3, height: 2 })
		const boardAfterFirst = setCell({ board, x: 0, y: 0, state: VIRUS_RED })
		const boardAfterSecond = setCell({
			board: boardAfterFirst,
			x: 2,
			y: 1,
			state: PILL_BLUE,
		})
		const actual1 = getCell({ board: boardAfterSecond, x: 0, y: 0 })
		const actual2 = getCell({ board: boardAfterSecond, x: 2, y: 1 })
		const expected1 = VIRUS_RED
		const expected2 = PILL_BLUE

		assert({
			given,
			should: 'update first cell correctly',
			actual: actual1,
			expected: expected1,
		})

		assert({
			given,
			should: 'update second cell correctly',
			actual: actual2,
			expected: expected2,
		})
	})

	test('should return original board unchanged for invalid coordinates (x too high)', () => {
		const given = 'invalid coordinates (x too high)'
		const should = 'throw error'

		const board = createBoard({ width: 3, height: 2 })
		const actual = () => setCell({ board, x: 3, y: 0, state: VIRUS_RED })
		const expected = 'Error'

		assert({
			given,
			should,
			actual: actual.constructor.name,
			expected,
		})
	})

	test('should throw error for invalid coordinates (y too high)', () => {
		const given = 'invalid coordinates (y too high)'
		const should = 'throw error'

		const board = createBoard({ width: 3, height: 2 })
		const actual = () => setCell({ board, x: 0, y: 2, state: VIRUS_RED })
		const expected = 'Error'

		assert({
			given,
			should,
			actual: actual.constructor.name,
			expected,
		})
	})

	test('should throw error for negative x coordinate', () => {
		const given = 'invalid coordinates (negative x)'
		const should = 'throw error'

		const board = createBoard({ width: 3, height: 2 })
		const actual = () => setCell({ board, x: -1, y: 0, state: VIRUS_RED })
		const expected = 'Error'

		assert({
			given,
			should,
			actual: actual.constructor.name,
			expected,
		})
	})

	test('should throw error for negative y coordinate', () => {
		const given = 'invalid coordinates (negative y)'
		const should = 'throw error'

		const board = createBoard({ width: 3, height: 2 })
		const actual = () => setCell({ board, x: 0, y: -1, state: VIRUS_RED })
		const expected = 'Error'

		assert({
			given,
			should,
			actual: actual.constructor.name,
			expected,
		})
	})
})

