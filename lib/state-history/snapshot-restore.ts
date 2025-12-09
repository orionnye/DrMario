import type { StateSnapshot } from './state-snapshot'
import type { FallingPill } from '../pill-falling/pill-fall-state'
import { createFallingPill } from '../pill-falling/pill-fall-state'
import { createPill } from '../pill/pill'

/**
 * Deserialize JSON string back to StateSnapshot
 * 
 * @param json - JSON string to deserialize
 * @returns StateSnapshot or null if invalid
 */
export const deserializeSnapshot = (json: string): StateSnapshot | null => {
	try {
		const parsed = JSON.parse(json)

		// Validate required properties
		if (
			!parsed ||
			typeof parsed.frame !== 'number' ||
			typeof parsed.timestamp !== 'number' ||
			typeof parsed.seed !== 'number' ||
			typeof parsed.minY !== 'number' ||
			typeof parsed.fallSpeed !== 'number' ||
			!Array.isArray(parsed.fallingPills) ||
			!Array.isArray(parsed.lockedPills)
		) {
			return null
		}

		// Reconstruct falling pills with proper types
		const fallingPills: FallingPill[] = parsed.fallingPills.map((fp: any) => {
			const pill = createPill({
				colors: [fp.colors[0], fp.colors[1]],
				x: fp.x,
				y: fp.y,
				orientation: fp.orientation,
				rotation: fp.rotation,
			})

			return createFallingPill({
				pill,
				frameCount: fp.frameCount ?? 0,
				fallSpeed: fp.fallSpeed ?? parsed.fallSpeed,
				lockDelayFrames: fp.lockDelayFrames,
				landedAtFrame: fp.landedAtFrame,
			})
		})

		// Reconstruct locked pills with proper types
		const lockedPills = parsed.lockedPills.map((p: any) =>
			createPill({
				colors: [p.colors[0], p.colors[1]],
				x: p.x,
				y: p.y,
				orientation: p.orientation,
				rotation: p.rotation,
			}),
		)

		return {
			fallingPills,
			lockedPills,
			seed: parsed.seed,
			minY: parsed.minY,
			fallSpeed: parsed.fallSpeed,
			frame: parsed.frame,
			timestamp: parsed.timestamp,
		}
	} catch {
		return null
	}
}

