import { useState, useEffect, useMemo } from 'react'
import { createPill, type PillColor } from '@/lib/pill/pill'
import { canPlacePill } from '@/lib/pill/can-place-pill'
import { createFallingPill, type FallingPill } from '@/lib/pill-falling'
import type { Board } from '@/lib/board-grid/board'

type PillConfig = {
	colors: readonly [PillColor, PillColor]
	x: number
	y: number
	orientation: 'HORIZONTAL' | 'VERTICAL'
	rotation: 0 | 90 | 180 | 270
}

type UseFallingPillsParams = {
	initialConfigs: readonly PillConfig[]
	board: Board
	fallSpeed: number
	lockDelayFrames: number
}

export const useFallingPills = ({
	initialConfigs,
	board,
	fallSpeed,
	lockDelayFrames,
}: UseFallingPillsParams) => {
	const [fallingPills, setFallingPills] = useState<FallingPill[]>([])

	// Initialize falling pills from configs
	useEffect(() => {
		if (fallingPills.length === 0 && initialConfigs.length > 0) {
			const initialFallingPills = initialConfigs
				.map((config) => {
					const pill = createPill({
						colors: [config.colors[0], config.colors[1]],
						x: config.x,
						y: config.y,
						orientation: config.orientation,
						rotation: config.rotation,
					})
					// Only include pills that can be placed (not overlapping)
					if (canPlacePill({ board, pill })) {
						return createFallingPill({
							pill,
							frameCount: 0,
							fallSpeed,
							lockDelayFrames,
						})
					}
					return null
				})
				.filter((fp): fp is FallingPill => fp !== null)
			setFallingPills(initialFallingPills)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // Only run once on mount

	// Update fall speed for existing falling pills when it changes
	useEffect(() => {
		if (fallingPills.length > 0) {
			setFallingPills((prev) =>
				prev.map((fp) =>
					createFallingPill({
						pill: fp,
						frameCount: fp.frameCount,
						fallSpeed,
						lockDelayFrames: fp.lockDelayFrames,
						landedAtFrame: fp.landedAtFrame,
					}),
				),
			)
		}
	}, [fallSpeed, fallingPills.length, lockDelayFrames])

	return {
		fallingPills,
		setFallingPills,
	}
}

