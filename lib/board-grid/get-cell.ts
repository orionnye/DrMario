import { Board } from './board'
import { CellState } from './cell-state'

export const getCell = ({
	board,
	x,
	y,
}: {
	board: Board
	x: number
	y: number
}): CellState => {
	if (x < 0 || x >= board.width || y < 0 || y >= board.height) {
		throw new Error(`Coordinates (${x}, ${y}) are outside board bounds`)
	}

	const index = y * board.width + x
	return board.cells[index]
}

