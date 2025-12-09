import type { FallingPill } from '../pill-falling/pill-fall-state'
import type { Pill } from '../pill/pill'

export type GameState = {
	readonly fallingPills: readonly FallingPill[]
	readonly lockedPills: readonly Pill[]
	readonly seed: number
	readonly minY: number
	readonly fallSpeed: number
	readonly frame: number
}

