import { describe, test } from 'vitest'
import assert from 'riteway'
import { createBoard } from './board'
import { setCell } from './set-cell'
import { EMPTY, VIRUS_RED, PILL_BLUE } from './cell-state'
import { isCellEmpty } from './is-cell-empty'

describe('isCellEmpty', () => {
	test('should return true for coordinates with EMPTY cell', () => {
		const given = 'coordinates with EMPTY cell'
		const should = 'return true'

		const board = createBoard({ width: 3, height: 2 })
		const actual = isCellEmpty({ board, x: 1, y: 0 })
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false for coordinates with non-empty cell (virus)', () => {
		const given = 'coordinates with non-empty cell (virus)'
		const should = 'return false'

		const board = createBoard({ width: 3, height: 2 })
		const boardWithVirus = setCell({ board, x: 1, y: 0, state: VIRUS_RED })
		const actual = isCellEmpty({ board: boardWithVirus, x: 1, y: 0 })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false for coordinates with non-empty cell (pill)', () => {
		const given = 'coordinates with non-empty cell (pill)'
		const should = 'return false'

		const board = createBoard({ width: 3, height: 2 })
		const boardWithPill = setCell({ board, x: 2, y: 1, state: PILL_BLUE })
		const actual = isCellEmpty({ board: boardWithPill, x: 2, y: 1 })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false for invalid coordinates', () => {
		const given = 'invalid coordinates'
		const should = 'return false'

		const board = createBoard({ width: 3, height: 2 })
		const actual = isCellEmpty({ board, x: 5, y: 5 })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false for negative coordinates', () => {
		const given = 'negative coordinates'
		const should = 'return false'

		const board = createBoard({ width: 3, height: 2 })
		const actual = isCellEmpty({ board, x: -1, y: -1 })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

