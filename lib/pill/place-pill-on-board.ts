import { Board } from '@/lib/board-grid/board'
import { setCell } from '@/lib/board-grid/set-cell'
import { PILL_RED, PILL_BLUE, PILL_YELLOW, type CellState } from '@/lib/board-grid/cell-state'
import { getPillCells } from './get-pill-cells'
import type { Pill } from './pill'

type PlacePillOnBoardParams = {
	board: Board
	pill: Pill
}

const pillColorToCellState = (color: string): CellState => {
	switch (color) {
		case 'RED':
			return PILL_RED
		case 'BLUE':
			return PILL_BLUE
		case 'YELLOW':
			return PILL_YELLOW
		default:
			throw new Error(`Invalid pill color: ${color}`)
	}
}

export const placePillOnBoard = ({
	board,
	pill,
}: PlacePillOnBoardParams): Board => {
	const cells = getPillCells(pill)

	return cells.reduce((currentBoard, cell) => {
		const cellState = pillColorToCellState(cell.color)
		return setCell({
			board: currentBoard,
			x: cell.x,
			y: cell.y,
			state: cellState,
		})
	}, board)
}

