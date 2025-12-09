import { useMemo } from 'react'
import { createBoard } from '@/lib/board-grid'
import {
	generateVirusPlacement,
	placeVirusesOnBoard,
	validateVirusPlacement,
} from '@/lib/virus-placement'

type UseGameBoardParams = {
	seed: number
	minY: number
	virusCount?: number
}

export const useGameBoard = ({ seed, minY, virusCount = 20 }: UseGameBoardParams) => {
	return useMemo(() => {
		const board = createBoard({ width: 8, height: 16 })
		const placements = generateVirusPlacement({ board, count: virusCount, seed, minY })
		const validation = validateVirusPlacement({ board, placements })
		const boardWithViruses = validation.valid
			? placeVirusesOnBoard({ board, placements })
			: board

		return {
			board: boardWithViruses,
			placements,
			isValid: validation.valid,
		}
	}, [seed, minY, virusCount])
}

