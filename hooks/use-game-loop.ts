import { useEffect, useRef, useState } from 'react'
import { createBoard } from '@/lib/board-grid'
import {
	generateVirusPlacement,
	placeVirusesOnBoard,
	validateVirusPlacement,
} from '@/lib/virus-placement'
import { createPill } from '@/lib/pill/pill'
import { canPlacePill } from '@/lib/pill/can-place-pill'
import { doPillsOverlap } from '@/lib/pill/do-pills-overlap'
import { placePillOnBoard } from '@/lib/pill/place-pill-on-board'
import { checkPillLanding, shouldLockPill, updatePillPosition, type FallingPill } from '@/lib/pill-falling'

type UseGameLoopParams = {
	readonly seed: number
	readonly minY: number
	readonly fallingPills: readonly FallingPill[]
	readonly setFallingPills: React.Dispatch<React.SetStateAction<FallingPill[]>>
	readonly lockedPills: readonly ReturnType<typeof createPill>[]
	readonly setLockedPills: React.Dispatch<React.SetStateAction<ReturnType<typeof createPill>[]>>
}

export const useGameLoop = ({
	seed,
	minY,
	fallingPills,
	setFallingPills,
	lockedPills,
	setLockedPills,
}: UseGameLoopParams) => {
	const [currentFrame, setCurrentFrame] = useState(0)
	const frameRef = useRef(0)
	const animationFrameRef = useRef<number | null>(null)

	useEffect(() => {
		const gameLoop = () => {
			frameRef.current += 1
			setCurrentFrame(frameRef.current)

			setFallingPills((prevFallingPills) => {
				const board = createBoard({ width: 8, height: 16 })
				const placements = generateVirusPlacement({ board, count: 20, seed, minY })
				const validation = validateVirusPlacement({ board, placements })
				const boardWithViruses = validation.valid
					? placeVirusesOnBoard({ board, placements })
					: board

				// Create board with locked pills for collision detection
				// IMPORTANT: Don't include other falling pills in collision check
				const boardWithLockedPills = lockedPills.reduce(
					(currentBoard, pill) => placePillOnBoard({ board: currentBoard, pill }),
					boardWithViruses,
				)

				// Process pills that should be locked, building board incrementally to prevent overlaps
				const pillsToLock: ReturnType<typeof createPill>[] = []
				const pillsToLockMap = new Map<string, ReturnType<typeof createPill>>()
				let boardWithPendingLocks = boardWithLockedPills
				
				// First, identify all pills that should lock and validate them sequentially
				const pillsReadyToLock = prevFallingPills
					.map((fallingPill) => {
						const hasLanded = checkPillLanding({ fallingPill, board: boardWithPendingLocks })
						if (hasLanded && shouldLockPill({ fallingPill, currentFrame: frameRef.current })) {
							return {
								fallingPill,
								pill: createPill({
									colors: [fallingPill.colors[0], fallingPill.colors[1]],
									x: fallingPill.x,
									y: fallingPill.y,
									orientation: fallingPill.orientation,
									rotation: fallingPill.rotation,
								}),
							}
						}
						return null
					})
					.filter((item): item is { fallingPill: FallingPill; pill: ReturnType<typeof createPill> } => item !== null)
				
				// Validate each pill sequentially, building board as we go
				for (const { fallingPill, pill: pillToLock } of pillsReadyToLock) {
					// Check against board with locked pills and previously validated pills in this frame
					if (canPlacePill({ board: boardWithPendingLocks, pill: pillToLock })) {
						pillsToLock.push(pillToLock)
						// Create a unique key for this falling pill to track it
						const pillKey = `${fallingPill.x},${fallingPill.y},${fallingPill.rotation},${fallingPill.colors[0]},${fallingPill.colors[1]}`
						pillsToLockMap.set(pillKey, pillToLock)
						boardWithPendingLocks = placePillOnBoard({ board: boardWithPendingLocks, pill: pillToLock })
					}
				}
				
				// Filter out only pills that were successfully locked (in pillsToLockMap)
				const updatedFallingPills = prevFallingPills.filter((fallingPill) => {
					const pillKey = `${fallingPill.x},${fallingPill.y},${fallingPill.rotation},${fallingPill.colors[0]},${fallingPill.colors[1]}`
					return !pillsToLockMap.has(pillKey)
				})

				// Add locked pills to state
				if (pillsToLock.length > 0) {
					setLockedPills((prev) => [...prev, ...pillsToLock])
				}

				// Build board with all other falling pills for collision detection
				const boardWithAllFallingPills = updatedFallingPills.reduce(
					(currentBoard, otherFallingPill) => {
						const otherPill = createPill({
							colors: [otherFallingPill.colors[0], otherFallingPill.colors[1]],
							x: otherFallingPill.x,
							y: otherFallingPill.y,
							orientation: otherFallingPill.orientation,
							rotation: otherFallingPill.rotation,
						})
						return placePillOnBoard({ board: currentBoard, pill: otherPill })
					},
					boardWithPendingLocks,
				)

				return updatedFallingPills
					.map((fallingPill, index) => {
						// Create board with other falling pills (excluding current one) for collision detection
						const boardWithOtherFallingPills = updatedFallingPills
							.filter((_, i) => i !== index)
							.reduce(
								(currentBoard, otherFallingPill) => {
									const otherPill = createPill({
										colors: [otherFallingPill.colors[0], otherFallingPill.colors[1]],
										x: otherFallingPill.x,
										y: otherFallingPill.y,
										orientation: otherFallingPill.orientation,
										rotation: otherFallingPill.rotation,
									})
									return placePillOnBoard({ board: currentBoard, pill: otherPill })
								},
								boardWithPendingLocks,
							)

						// Check if pill has landed (against board with viruses, locked pills, and other falling pills)
						const hasLanded = checkPillLanding({ fallingPill, board: boardWithOtherFallingPills })

						// If landed, set landedAtFrame if not already set
						if (hasLanded && fallingPill.landedAtFrame === undefined) {
							return {
								...fallingPill,
								frameCount: fallingPill.frameCount + 1,
								landedAtFrame: frameRef.current,
							}
						}

						// If landed but not locked, just increment frame count (don't move)
						if (hasLanded) {
							return {
								...fallingPill,
								frameCount: fallingPill.frameCount + 1,
							}
						}

						// If not landed, check if moving would cause collision with other falling pills
						const pillAfterMove = updatePillPosition({ fallingPill, deltaFrames: 1 })
						const wouldMove = pillAfterMove.y !== fallingPill.y

						if (wouldMove) {
							const newPill = createPill({
								colors: [pillAfterMove.colors[0], pillAfterMove.colors[1]],
								x: pillAfterMove.x,
								y: pillAfterMove.y,
								orientation: pillAfterMove.orientation,
								rotation: pillAfterMove.rotation,
							})

							// Check if new position would overlap with other falling pills at their current positions
							const wouldOverlap = updatedFallingPills
								.filter((_, i) => i !== index)
								.some((otherFallingPill) => {
									const otherPill = createPill({
										colors: [otherFallingPill.colors[0], otherFallingPill.colors[1]],
										x: otherFallingPill.x,
										y: otherFallingPill.y,
										orientation: otherFallingPill.orientation,
										rotation: otherFallingPill.rotation,
									})
									return doPillsOverlap({ pill1: newPill, pill2: otherPill })
								})

							// Also check against locked/virus board
							const wouldCollideWithBoard = !canPlacePill({
								board: boardWithOtherFallingPills,
								pill: newPill,
							})

							// If would overlap or collide, don't move (pill has landed)
							if (wouldOverlap || wouldCollideWithBoard) {
								return {
									...fallingPill,
									frameCount: fallingPill.frameCount + 1,
									landedAtFrame: fallingPill.landedAtFrame ?? frameRef.current,
								}
							}
						}

						// If not landed and no collision, update position
						return pillAfterMove
					})
			})

			animationFrameRef.current = requestAnimationFrame(gameLoop)
		}

		animationFrameRef.current = requestAnimationFrame(gameLoop)

		return () => {
			if (animationFrameRef.current !== null) {
				cancelAnimationFrame(animationFrameRef.current)
			}
		}
	}, [seed, minY, lockedPills, setFallingPills, setLockedPills])

	return {
		currentFrame,
	} as const
}

