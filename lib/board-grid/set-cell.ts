import { Board, createBoard } from './board'
import { CellState } from './cell-state'

export const setCell = ({
	board,
	x,
	y,
	state,
}: {
	board: Board
	x: number
	y: number
	state: CellState
}): Board => {
	if (x < 0 || x >= board.width || y < 0 || y >= board.height) {
		throw new Error(`Coordinates (${x}, ${y}) are outside board bounds`)
	}

	const index = y * board.width + x
	const newCells = [...board.cells]
	newCells[index] = state

	return {
		width: board.width,
		height: board.height,
		cells: Object.freeze(newCells) as readonly CellState[],
	}
}

