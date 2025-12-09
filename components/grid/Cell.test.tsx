import { describe, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import assert from 'riteway'
import { Cell } from './Cell'
import {
	EMPTY,
	VIRUS_RED,
	VIRUS_BLUE,
	VIRUS_YELLOW,
	PILL_RED,
	PILL_BLUE,
	PILL_YELLOW,
} from '@/lib/board-grid/cell-state'

describe('Cell', () => {
	test('should render empty cell for EMPTY state', () => {
		const given = 'EMPTY cell state'
		const should = 'render empty cell'

		render(<Cell state={EMPTY} size={32} />)
		const cell = screen.getByTestId('cell')
		const actual = cell.getAttribute('data-state')
		const expected = EMPTY

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should render virus cell for VIRUS_RED state', () => {
		const given = 'VIRUS_RED cell state'
		const should = 'render virus cell with correct state'

		render(<Cell state={VIRUS_RED} size={32} />)
		const cell = screen.getByTestId('cell')
		const actual = cell.getAttribute('data-state')
		const expected = VIRUS_RED

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should render virus cell for VIRUS_BLUE state', () => {
		const given = 'VIRUS_BLUE cell state'
		const should = 'render virus cell with correct state'

		render(<Cell state={VIRUS_BLUE} size={32} />)
		const cell = screen.getByTestId('cell')
		const actual = cell.getAttribute('data-state')
		const expected = VIRUS_BLUE

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should render virus cell for VIRUS_YELLOW state', () => {
		const given = 'VIRUS_YELLOW cell state'
		const should = 'render virus cell with correct state'

		render(<Cell state={VIRUS_YELLOW} size={32} />)
		const cell = screen.getByTestId('cell')
		const actual = cell.getAttribute('data-state')
		const expected = VIRUS_YELLOW

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should render pill cell for PILL_RED state', () => {
		const given = 'PILL_RED cell state'
		const should = 'render pill cell with correct state'

		render(<Cell state={PILL_RED} size={32} />)
		const cell = screen.getByTestId('cell')
		const actual = cell.getAttribute('data-state')
		const expected = PILL_RED

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should render pill cell for PILL_BLUE state', () => {
		const given = 'PILL_BLUE cell state'
		const should = 'render pill cell with correct state'

		render(<Cell state={PILL_BLUE} size={32} />)
		const cell = screen.getByTestId('cell')
		const actual = cell.getAttribute('data-state')
		const expected = PILL_BLUE

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should render pill cell for PILL_YELLOW state', () => {
		const given = 'PILL_YELLOW cell state'
		const should = 'render pill cell with correct state'

		render(<Cell state={PILL_YELLOW} size={32} />)
		const cell = screen.getByTestId('cell')
		const actual = cell.getAttribute('data-state')
		const expected = PILL_YELLOW

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should accept configurable size prop', () => {
		const given = 'cell component with size prop'
		const should = 'apply size to cell element'

		render(<Cell state={EMPTY} size={48} />)
		const cell = screen.getByTestId('cell')
		const actual = cell.style.width
		const expected = '48px'

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

