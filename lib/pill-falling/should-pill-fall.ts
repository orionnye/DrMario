import type { FallingPill } from './pill-fall-state'

export const shouldPillFall = (fallingPill: FallingPill): boolean => {
	return fallingPill.frameCount > 0 && fallingPill.frameCount % fallingPill.fallSpeed === 0
}

