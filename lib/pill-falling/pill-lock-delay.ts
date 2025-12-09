import type { FallingPill } from './pill-fall-state'

type ShouldLockPillParams = {
	fallingPill: FallingPill
	currentFrame: number
}

export const shouldLockPill = ({
	fallingPill,
	currentFrame,
}: ShouldLockPillParams): boolean => {
	// If pill hasn't landed, don't lock
	if (fallingPill.landedAtFrame === undefined) {
		return false
	}

	// If lock delay not configured, lock immediately
	if (fallingPill.lockDelayFrames === undefined) {
		return true
	}

	// Check if lock delay has elapsed
	const framesSinceLanding = currentFrame - fallingPill.landedAtFrame
	return framesSinceLanding >= fallingPill.lockDelayFrames
}

