import type { FallingPill } from './pill-fall-state'
import { Board } from '@/lib/board-grid/board'
import { canPlacePill } from '../pill/can-place-pill'
import { createPill } from '../pill/pill'

type CheckPillLandingParams = {
	fallingPill: FallingPill
	board: Board
}

export const checkPillLanding = ({
	fallingPill,
	board,
}: CheckPillLandingParams): boolean => {
	// Create a pill one cell down
	const pillOneCellDown = createPill({
		colors: [fallingPill.colors[0], fallingPill.colors[1]],
		x: fallingPill.x,
		y: fallingPill.y + 1,
		orientation: fallingPill.orientation,
		rotation: fallingPill.rotation,
	})

	// If pill cannot be placed one cell down, it has landed
	return !canPlacePill({ board, pill: pillOneCellDown })
}

