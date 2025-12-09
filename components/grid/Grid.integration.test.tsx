import { describe, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import assert from 'riteway'
import { Grid } from './Grid'
import { createBoard, setCell } from '@/lib/board-grid'
import {
	VIRUS_RED,
	VIRUS_BLUE,
	VIRUS_YELLOW,
	PILL_RED,
	PILL_BLUE,
	PILL_YELLOW,
	EMPTY,
} from '@/lib/board-grid/cell-state'

describe('Grid Integration', () => {
	test('should render viruses in correct positions', () => {
		const given = 'a board with viruses'
		const should = 'render viruses in correct positions'

		const board = createBoard({ width: 3, height: 3 })
		const boardWithViruses = setCell({
			board: setCell({ board, x: 0, y: 0, state: VIRUS_RED }),
			x: 1,
			y: 1,
			state: VIRUS_BLUE,
		})
		render(<Grid board={boardWithViruses} cellSize={32} />)
		const cells = screen.getAllByTestId('cell')
		const actual1 = cells[0].getAttribute('data-state')
		const actual2 = cells[4].getAttribute('data-state')
		const expected1 = VIRUS_RED
		const expected2 = VIRUS_BLUE

		assert({
			given,
			should: 'render VIRUS_RED at position (0,0)',
			actual: actual1,
			expected: expected1,
		})

		assert({
			given,
			should: 'render VIRUS_BLUE at position (1,1)',
			actual: actual2,
			expected: expected2,
		})
	})

	test('should render pills in correct positions', () => {
		const given = 'a board with pills'
		const should = 'render pills in correct positions'

		const board = createBoard({ width: 3, height: 3 })
		const boardWithPills = setCell({
			board: setCell({ board, x: 2, y: 0, state: PILL_RED }),
			x: 0,
			y: 2,
			state: PILL_BLUE,
		})
		render(<Grid board={boardWithPills} cellSize={32} />)
		const cells = screen.getAllByTestId('cell')
		const actual1 = cells[2].getAttribute('data-state')
		const actual2 = cells[6].getAttribute('data-state')
		const expected1 = PILL_RED
		const expected2 = PILL_BLUE

		assert({
			given,
			should: 'render PILL_RED at position (2,0)',
			actual: actual1,
			expected: expected1,
		})

		assert({
			given,
			should: 'render PILL_BLUE at position (0,2)',
			actual: actual2,
			expected: expected2,
		})
	})

	test('should re-render with new cell states when board updates', () => {
		const given = 'board updates'
		const should = 're-render with new cell states'

		const board = createBoard({ width: 2, height: 2 })
		const { rerender } = render(<Grid board={board} cellSize={32} />)
		const cellsBefore = screen.getAllByTestId('cell')
		const actualBefore = cellsBefore[0].getAttribute('data-state')
		const expectedBefore = EMPTY

		assert({
			given,
			should: 'render EMPTY initially',
			actual: actualBefore,
			expected: expectedBefore,
		})

		const updatedBoard = setCell({ board, x: 0, y: 0, state: VIRUS_YELLOW })
		rerender(<Grid board={updatedBoard} cellSize={32} />)
		const cellsAfter = screen.getAllByTestId('cell')
		const actualAfter = cellsAfter[0].getAttribute('data-state')
		const expectedAfter = VIRUS_YELLOW

		assert({
			given,
			should: 're-render with VIRUS_YELLOW after update',
			actual: actualAfter,
			expected: expectedAfter,
		})
	})

	test('should not mutate board prop', () => {
		const given = 'grid component'
		const should = 'not mutate board prop'

		const board = createBoard({ width: 2, height: 2 })
		const originalCells = [...board.cells]
		render(<Grid board={board} cellSize={32} />)
		const actual = board.cells
		const expected = originalCells

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

