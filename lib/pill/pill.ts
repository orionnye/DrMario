export type PillColor = 'RED' | 'BLUE' | 'YELLOW'

export type PillOrientation = 'HORIZONTAL' | 'VERTICAL'

export type Pill = {
	readonly colors: readonly [PillColor, PillColor]
	readonly x: number
	readonly y: number
	readonly orientation: PillOrientation
	readonly rotation: 0 | 90 | 180 | 270
}

type CreatePillParams = {
	colors: [PillColor, PillColor]
	x: number
	y: number
	orientation: PillOrientation
	rotation?: 0 | 90 | 180 | 270
}

export const createPill = ({
	colors,
	x,
	y,
	orientation,
	rotation = 0,
}: CreatePillParams): Pill => {
	if (colors.length !== 2) {
		throw new Error('Pill must have exactly two colors')
	}

	return {
		colors: [colors[0], colors[1]],
		x,
		y,
		orientation,
		rotation,
	}
}

