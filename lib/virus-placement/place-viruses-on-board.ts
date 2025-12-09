import { Board } from '@/lib/board-grid/board'
import { setCell } from '@/lib/board-grid/set-cell'
import {
	VIRUS_RED,
	VIRUS_BLUE,
	VIRUS_YELLOW,
	type CellState,
} from '@/lib/board-grid/cell-state'
import type { VirusPlacement } from './generate-virus-placement'

type PlaceVirusesOnBoardParams = {
	board: Board
	placements: VirusPlacement[]
}

const virusColorToCellState = (color: string): CellState => {
	switch (color) {
		case 'RED':
			return VIRUS_RED
		case 'BLUE':
			return VIRUS_BLUE
		case 'YELLOW':
			return VIRUS_YELLOW
		default:
			throw new Error(`Invalid virus color: ${color}`)
	}
}

export const placeVirusesOnBoard = ({
	board,
	placements,
}: PlaceVirusesOnBoardParams): Board => {
	return placements.reduce((currentBoard, placement) => {
		const cellState = virusColorToCellState(placement.color)
		return setCell({
			board: currentBoard,
			x: placement.x,
			y: placement.y,
			state: cellState,
		})
	}, board)
}

