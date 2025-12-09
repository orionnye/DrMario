import { createBoard } from '@/lib/board-grid'
import {
	generateVirusPlacement,
	placeVirusesOnBoard,
	validateVirusPlacement,
} from '@/lib/virus-placement'
import { createPill, type PillColor } from './pill'
import { canPlacePill } from './can-place-pill'
import { placePillOnBoard } from './place-pill-on-board'
import { createFallingPill, type FallingPill } from '@/lib/pill-falling'

type ScramblePillsParams = {
	seed: number
	minY: number
	fallSpeed: number
	lockDelayFrames: number
	count?: number
}

export const scramblePills = ({
	seed,
	minY,
	fallSpeed,
	lockDelayFrames,
	count = 3,
}: ScramblePillsParams): readonly FallingPill[] => {
	const board = createBoard({ width: 8, height: 16 })
	const placements = generateVirusPlacement({ board, count: 20, seed, minY })
	const validation = validateVirusPlacement({ board, placements })
	const boardWithViruses = validation.valid
		? placeVirusesOnBoard({ board, placements })
		: board

	const newFallingPills: FallingPill[] = []
	const colors: PillColor[] = ['RED', 'BLUE', 'YELLOW']
	const orientations: ('HORIZONTAL' | 'VERTICAL')[] = ['HORIZONTAL', 'VERTICAL']
	const rotations: (0 | 90 | 180 | 270)[] = [0, 90, 180, 270]

	// Try to place each pill at a random valid position
	for (let i = 0; i < count; i++) {
		let attempts = 0
		let placed = false

		while (!placed && attempts < 100) {
			const x = Math.floor(Math.random() * board.width)
			const y = Math.floor(Math.random() * 3) // Start near top
			const color1 = colors[Math.floor(Math.random() * colors.length)]
			const color2 = colors[Math.floor(Math.random() * colors.length)]
			const orientation = orientations[Math.floor(Math.random() * orientations.length)]
			const rotation = rotations[Math.floor(Math.random() * rotations.length)]

			const testPill = createPill({
				colors: [color1, color2],
				x,
				y,
				orientation,
				rotation,
			})

			// Check if pill can be placed on the board with viruses
			if (canPlacePill({ board: boardWithViruses, pill: testPill })) {
				// Also check it doesn't overlap with already-placed pills in this scramble
				const tempBoard = newFallingPills.reduce(
					(currentBoard, fallingPill) => {
						const pill = createPill({
							colors: [fallingPill.colors[0], fallingPill.colors[1]],
							x: fallingPill.x,
							y: fallingPill.y,
							orientation: fallingPill.orientation,
							rotation: fallingPill.rotation,
						})
						return placePillOnBoard({ board: currentBoard, pill })
					},
					boardWithViruses,
				)

				if (canPlacePill({ board: tempBoard, pill: testPill })) {
					const newFallingPill = createFallingPill({
						pill: testPill,
						frameCount: 0,
						fallSpeed,
						lockDelayFrames,
					})
					newFallingPills.push(newFallingPill)
					placed = true
				}
			}
			attempts++
		}
	}

	return newFallingPills
}

