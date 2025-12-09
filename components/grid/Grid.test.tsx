import { describe, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import assert from 'riteway'
import { Grid } from './Grid'
import { createBoard, setCell } from '@/lib/board-grid'
import { EMPTY, VIRUS_RED, PILL_BLUE } from '@/lib/board-grid/cell-state'

describe('Grid', () => {
	test('should render all cells in grid layout', () => {
		const given = 'a board'
		const should = 'render all cells in grid layout'

		const board = createBoard({ width: 3, height: 2 })
		render(<Grid board={board} cellSize={32} />)
		const cells = screen.getAllByTestId('cell')
		const actual = cells.length
		const expected = 6 // 3 * 2

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should create grid with correct number of rows and columns', () => {
		const given = 'board dimensions'
		const should = 'create grid with correct number of rows and columns'

		const board = createBoard({ width: 4, height: 5 })
		render(<Grid board={board} cellSize={32} />)
		const grid = screen.getByTestId('grid')
		const actual = grid.style.gridTemplateColumns
		const expected = 'repeat(4, 32px)'

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should pass correct state to each cell component', () => {
		const given = 'cell states'
		const should = 'pass correct state to each cell component'

		const board = createBoard({ width: 2, height: 2 })
		const boardWithVirus = setCell({ board, x: 0, y: 0, state: VIRUS_RED })
		const boardWithPill = setCell({
			board: boardWithVirus,
			x: 1,
			y: 1,
			state: PILL_BLUE,
		})
		render(<Grid board={boardWithPill} cellSize={32} />)
		const cells = screen.getAllByTestId('cell')
		const actual1 = cells[0].getAttribute('data-state')
		const actual2 = cells[3].getAttribute('data-state')
		const expected1 = VIRUS_RED
		const expected2 = PILL_BLUE

		assert({
			given,
			should: 'pass VIRUS_RED to first cell',
			actual: actual1,
			expected: expected1,
		})

		assert({
			given,
			should: 'pass PILL_BLUE to last cell',
			actual: actual2,
			expected: expected2,
		})
	})

	test('should accept configurable cell size prop', () => {
		const given = 'grid component with cell size prop'
		const should = 'apply cell size to grid and cells'

		const board = createBoard({ width: 2, height: 2 })
		render(<Grid board={board} cellSize={48} />)
		const grid = screen.getByTestId('grid')
		const actual = grid.style.gridTemplateColumns
		const expected = 'repeat(2, 48px)'

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should use CSS Grid for layout', () => {
		const given = 'grid component'
		const should = 'use CSS Grid for layout'

		const board = createBoard({ width: 2, height: 2 })
		render(<Grid board={board} cellSize={32} />)
		const grid = screen.getByTestId('grid')
		const actual = grid.style.display
		const expected = 'grid'

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

