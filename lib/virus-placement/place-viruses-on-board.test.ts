import { describe, test } from 'vitest'
import assert from 'riteway'
import { placeVirusesOnBoard } from './place-viruses-on-board'
import { createBoard } from '@/lib/board-grid/board'
import { getCell } from '@/lib/board-grid/get-cell'
import { VIRUS_RED, VIRUS_BLUE, VIRUS_YELLOW, EMPTY } from '@/lib/board-grid/cell-state'
import type { VirusPlacement } from './generate-virus-placement'

describe('placeVirusesOnBoard', () => {
	test('should return new board with viruses placed', () => {
		const given = 'board and virus placements'
		const should = 'return new board with viruses placed'

		const board = createBoard({ width: 8, height: 16 })
		const placements: VirusPlacement[] = [
			{ x: 2, y: 14, color: 'RED' },
			{ x: 3, y: 14, color: 'BLUE' },
		]
		const newBoard = placeVirusesOnBoard({ board, placements })
		const actual = getCell({ board: newBoard, x: 2, y: 14 })
		const expected = VIRUS_RED

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should place each virus at correct coordinates', () => {
		const given = 'virus placements'
		const should = 'place each virus at correct coordinates'

		const board = createBoard({ width: 8, height: 16 })
		const placements: VirusPlacement[] = [
			{ x: 0, y: 0, color: 'RED' },
			{ x: 7, y: 15, color: 'BLUE' },
			{ x: 4, y: 8, color: 'YELLOW' },
		]
		const newBoard = placeVirusesOnBoard({ board, placements })
		const actual1 = getCell({ board: newBoard, x: 0, y: 0 })
		const actual2 = getCell({ board: newBoard, x: 7, y: 15 })
		const actual3 = getCell({ board: newBoard, x: 4, y: 8 })
		const expected1 = VIRUS_RED
		const expected2 = VIRUS_BLUE
		const expected3 = VIRUS_YELLOW

		assert({
			given,
			should: 'place VIRUS_RED at (0,0)',
			actual: actual1,
			expected: expected1,
		})

		assert({
			given,
			should: 'place VIRUS_BLUE at (7,15)',
			actual: actual2,
			expected: expected2,
		})

		assert({
			given,
			should: 'place VIRUS_YELLOW at (4,8)',
			actual: actual3,
			expected: expected3,
		})
	})

	test('should use correct cell state for each virus color', () => {
		const given = 'virus placements'
		const should = 'use correct cell state for each virus color'

		const board = createBoard({ width: 8, height: 16 })
		const placements: VirusPlacement[] = [
			{ x: 1, y: 1, color: 'RED' },
			{ x: 2, y: 2, color: 'BLUE' },
			{ x: 3, y: 3, color: 'YELLOW' },
		]
		const newBoard = placeVirusesOnBoard({ board, placements })
		const actual1 = getCell({ board: newBoard, x: 1, y: 1 })
		const actual2 = getCell({ board: newBoard, x: 2, y: 2 })
		const actual3 = getCell({ board: newBoard, x: 3, y: 3 })
		const expected1 = VIRUS_RED
		const expected2 = VIRUS_BLUE
		const expected3 = VIRUS_YELLOW

		assert({
			given,
			should: 'map RED to VIRUS_RED',
			actual: actual1,
			expected: expected1,
		})

		assert({
			given,
			should: 'map BLUE to VIRUS_BLUE',
			actual: actual2,
			expected: expected2,
		})

		assert({
			given,
			should: 'map YELLOW to VIRUS_YELLOW',
			actual: actual3,
			expected: expected3,
		})
	})

	test('should not mutate original board', () => {
		const given = 'placeVirusesOnBoard operation'
		const should = 'not mutate the original board'

		const board = createBoard({ width: 8, height: 16 })
		const originalCell = getCell({ board, x: 2, y: 14 })
		const placements: VirusPlacement[] = [
			{ x: 2, y: 14, color: 'RED' },
		]
		placeVirusesOnBoard({ board, placements })
		const actual = getCell({ board, x: 2, y: 14 })
		const expected = originalCell

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should leave other cells unchanged', () => {
		const given = 'virus placements'
		const should = 'leave other cells unchanged'

		const board = createBoard({ width: 8, height: 16 })
		const placements: VirusPlacement[] = [
			{ x: 2, y: 14, color: 'RED' },
		]
		const newBoard = placeVirusesOnBoard({ board, placements })
		const actual = getCell({ board: newBoard, x: 0, y: 0 })
		const expected = EMPTY

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

