import type { FallingPill } from './pill-fall-state'

type UpdatePillPositionParams = {
	fallingPill: FallingPill
	deltaFrames: number
}

export const updatePillPosition = ({
	fallingPill,
	deltaFrames,
}: UpdatePillPositionParams): FallingPill => {
	const newFrameCount = fallingPill.frameCount + deltaFrames
	const oldCycle = Math.floor(fallingPill.frameCount / fallingPill.fallSpeed)
	const newCycle = Math.floor(newFrameCount / fallingPill.fallSpeed)
	const shouldFall = newCycle > oldCycle && deltaFrames > 0

	if (shouldFall) {
		return {
			...fallingPill,
			y: fallingPill.y + 1,
			frameCount: newFrameCount,
		}
	}

	return {
		...fallingPill,
		frameCount: newFrameCount,
	}
}

