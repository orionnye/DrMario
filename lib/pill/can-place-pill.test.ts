import { describe, test } from 'vitest'
import assert from 'riteway'
import { createPill } from './pill'
import { canPlacePill } from './can-place-pill'
import { createBoard, setCell } from '@/lib/board-grid'
import { VIRUS_RED, EMPTY } from '@/lib/board-grid/cell-state'

describe('canPlacePill', () => {
	test('should return true if all pill cells are empty and within bounds', () => {
		const given = 'pill and board'
		const should = 'return true if all pill cells are empty and within bounds'

		const board = createBoard({ width: 8, height: 16 })
		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 0,
			orientation: 'HORIZONTAL',
		})
		const actual = canPlacePill({ board, pill })
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false if pill overlapping occupied cells', () => {
		const given = 'pill overlapping occupied cells'
		const should = 'return false'

		const board = createBoard({ width: 8, height: 16 })
		const boardWithVirus = setCell({ board, x: 3, y: 0, state: VIRUS_RED })
		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 0,
			orientation: 'HORIZONTAL',
		})
		const actual = canPlacePill({ board: boardWithVirus, pill })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false if pill outside board bounds (x too high)', () => {
		const given = 'pill outside board bounds'
		const should = 'return false'

		const board = createBoard({ width: 8, height: 16 })
		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 7,
			y: 0,
			orientation: 'HORIZONTAL', // Would extend to x=8 which is out of bounds
		})
		const actual = canPlacePill({ board, pill })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false if pill outside board bounds (y too high)', () => {
		const given = 'pill outside board bounds (y too high)'
		const should = 'return false'

		const board = createBoard({ width: 8, height: 16 })
		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 15,
			orientation: 'VERTICAL', // Would extend to y=16 which is out of bounds
		})
		const actual = canPlacePill({ board, pill })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false if pill outside board bounds (negative x)', () => {
		const given = 'pill outside board bounds (negative x)'
		const should = 'return false'

		const board = createBoard({ width: 8, height: 16 })
		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 0,
			y: 5,
			orientation: 'HORIZONTAL',
			rotation: 180, // Would extend to x=-1
		})
		const actual = canPlacePill({ board, pill })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false if pill outside board bounds (negative y)', () => {
		const given = 'pill outside board bounds (negative y)'
		const should = 'return false'

		const board = createBoard({ width: 8, height: 16 })
		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 0,
			orientation: 'VERTICAL',
			rotation: 270, // Would extend to y=-1
		})
		const actual = canPlacePill({ board, pill })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should not mutate board or pill', () => {
		const given = 'canPlacePill check'
		const should = 'not mutate board or pill'

		const board = createBoard({ width: 8, height: 16 })
		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 0,
			orientation: 'HORIZONTAL',
		})
		const originalPillX = pill.x
		const originalPillY = pill.y
		canPlacePill({ board, pill })
		const actual = pill.x === originalPillX && pill.y === originalPillY
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

