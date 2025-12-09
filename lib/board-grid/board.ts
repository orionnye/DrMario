import { CellState, EMPTY } from './cell-state'

export type Board = {
	readonly width: number
	readonly height: number
	readonly cells: readonly CellState[]
}

export const createBoard = ({
	width,
	height,
}: {
	width: number
	height: number
}): Board => {
	if (width <= 0 || height <= 0) {
		throw new Error('Board dimensions must be greater than zero')
	}

	const cells = Array<CellState>(width * height).fill(EMPTY)

	return {
		width,
		height,
		cells: Object.freeze(cells) as readonly CellState[],
	}
}

