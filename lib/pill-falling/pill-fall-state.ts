import type { Pill } from '../pill/pill'

export type FallingPill = Pill & {
	readonly frameCount: number
	readonly fallSpeed: number
	readonly lockDelayFrames?: number
	readonly landedAtFrame?: number
}

type CreateFallingPillParams = {
	pill: Pill
	frameCount?: number
	fallSpeed: number
	lockDelayFrames?: number
	landedAtFrame?: number
}

export const createFallingPill = ({
	pill,
	frameCount = 0,
	fallSpeed,
	lockDelayFrames,
	landedAtFrame,
}: CreateFallingPillParams): FallingPill => {
	return {
		...pill,
		frameCount,
		fallSpeed,
		...(lockDelayFrames !== undefined && { lockDelayFrames }),
		...(landedAtFrame !== undefined && { landedAtFrame }),
	}
}

