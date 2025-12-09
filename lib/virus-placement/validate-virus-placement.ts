import { Board } from '@/lib/board-grid/board'
import type { VirusPlacement } from './generate-virus-placement'

type ValidateVirusPlacementParams = {
	board: Board
	placements: VirusPlacement[]
}

export type ValidationResult = {
	valid: boolean
	error?: string
}

export const validateVirusPlacement = ({
	board,
	placements,
}: ValidateVirusPlacementParams): ValidationResult => {
	// Check all coordinates are within board bounds
	for (const placement of placements) {
		if (
			placement.x < 0 ||
			placement.x >= board.width ||
			placement.y < 0 ||
			placement.y >= board.height
		) {
			return {
				valid: false,
				error: `Placement at (${placement.x}, ${placement.y}) is outside board bounds`,
			}
		}
	}

	// Check for duplicate positions
	const positions = new Set<string>()
	for (const placement of placements) {
		const positionKey = `${placement.x},${placement.y}`
		if (positions.has(positionKey)) {
			return {
				valid: false,
				error: `Duplicate placement at (${placement.x}, ${placement.y})`,
			}
		}
		positions.add(positionKey)
	}

	return { valid: true }
}

