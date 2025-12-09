import { Board } from '@/lib/board-grid/board'
import { isValidPosition } from '@/lib/board-grid/is-valid-position'
import { isCellEmpty } from '@/lib/board-grid/is-cell-empty'
import { getPillCells } from './get-pill-cells'
import type { Pill } from './pill'

type CanPlacePillParams = {
	board: Board
	pill: Pill
}

export const canPlacePill = ({ board, pill }: CanPlacePillParams): boolean => {
	const cells = getPillCells(pill)

	// Check all cells are within bounds
	for (const cell of cells) {
		if (!isValidPosition({ board, x: cell.x, y: cell.y })) {
			return false
		}
	}

	// Check all cells are empty
	for (const cell of cells) {
		if (!isCellEmpty({ board, x: cell.x, y: cell.y })) {
			return false
		}
	}

	return true
}

