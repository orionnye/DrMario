import { Board } from './board'

export const isValidPosition = ({
	board,
	x,
	y,
}: {
	board: Board
	x: number
	y: number
}): boolean => {
	return x >= 0 && x < board.width && y >= 0 && y < board.height
}

