import { Board } from '@/lib/board-grid/board'

export type VirusColor = 'RED' | 'BLUE' | 'YELLOW'

export type VirusPlacement = {
	x: number
	y: number
	color: VirusColor
}

type GenerateVirusPlacementParams = {
	board: Board
	count: number
	seed?: number
	minY?: number // Minimum Y coordinate (0 = top, higher = lower on board)
}

// Simple seeded random number generator
const seededRandom = (seed: number) => {
	let value = seed
	return () => {
		value = (value * 9301 + 49297) % 233280
		return value / 233280
	}
}

const virusColors: VirusColor[] = ['RED', 'BLUE', 'YELLOW']

export const generateVirusPlacement = ({
	board,
	count,
	seed = Date.now(),
	minY = 0,
}: GenerateVirusPlacementParams): VirusPlacement[] => {
	const random = seededRandom(seed)
	const placements: VirusPlacement[] = []
	const usedPositions = new Set<string>()

	// Clamp minY to valid range
	const clampedMinY = Math.max(0, Math.min(minY, board.height - 1))
	const availableHeight = board.height - clampedMinY

	while (placements.length < count) {
		const x = Math.floor(random() * board.width)
		const y = clampedMinY + Math.floor(random() * availableHeight)
		const positionKey = `${x},${y}`

		if (!usedPositions.has(positionKey)) {
			usedPositions.add(positionKey)
			const colorIndex = Math.floor(random() * virusColors.length)
			placements.push({
				x,
				y,
				color: virusColors[colorIndex],
			})
		}
	}

	return placements
}

