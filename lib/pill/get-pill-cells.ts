import type { Pill } from './pill'

export type PillCell = {
	x: number
	y: number
	color: string
}

export const getPillCells = (pill: Pill): PillCell[] => {
	const { colors, x, y, orientation, rotation } = pill

	// Determine if colors should be swapped based on rotation
	const swapColors = rotation === 180 || rotation === 270
	const [color1, color2] = swapColors ? [colors[1], colors[0]] : colors

	// Handle all rotation/orientation combinations
	// Rotation 0 or 180 = horizontal placement
	// Rotation 90 or 270 = vertical placement
	if (rotation === 0 || rotation === 180) {
		// Horizontal placement
		if (rotation === 0) {
			return [
				{ x, y, color: color1 },
				{ x: x + 1, y, color: color2 },
			]
		} else {
			// rotation === 180
			return [
				{ x: x - 1, y, color: color1 },
				{ x, y, color: color2 },
			]
		}
	} else {
		// rotation === 90 || rotation === 270
		// Vertical placement
		if (rotation === 90) {
			return [
				{ x, y, color: color1 },
				{ x, y: y + 1, color: color2 },
			]
		} else {
			// rotation === 270
			return [
				{ x, y: y - 1, color: color1 },
				{ x, y, color: color2 },
			]
		}
	}
}

