import { Board } from './board'
import { EMPTY } from './cell-state'
import { getCell } from './get-cell'
import { isValidPosition } from './is-valid-position'

export const isCellEmpty = ({
	board,
	x,
	y,
}: {
	board: Board
	x: number
	y: number
}): boolean => {
	if (!isValidPosition({ board, x, y })) {
		return false
	}

	const cell = getCell({ board, x, y })
	return cell === EMPTY
}

