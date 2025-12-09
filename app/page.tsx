'use client'

import { useState, useMemo } from 'react'
import { Grid } from '@/components/grid'
import { GameControls, SnapshotControls } from '@/components/ui'
import { createPill, type PillColor } from '@/lib/pill/pill'
import { placePillOnBoard } from '@/lib/pill/place-pill-on-board'
import { useGameBoard, useFallingPills, useGameLoop, useStateHistory } from '@/hooks'
import { scramblePills } from '@/lib/pill/scramble-pills'
import type { GameState } from '@/lib/state-history/game-state'

type PillConfig = {
	readonly colors: readonly [PillColor, PillColor]
	readonly x: number
	readonly y: number
	readonly orientation: 'HORIZONTAL' | 'VERTICAL'
	readonly rotation: 0 | 90 | 180 | 270
}

export default function Home() {
	const [seed, setSeed] = useState(12345)
	const [fallSpeed, setFallSpeed] = useState(30) // frames per cell
	const [lockedPills, setLockedPills] = useState<ReturnType<typeof createPill>[]>([])
	const lockDelayFrames = 60 // frames before lock

	const pillConfigs: readonly PillConfig[] = [
		{ colors: ['RED', 'BLUE'], x: 1, y: 0, orientation: 'HORIZONTAL', rotation: 0 },
		{ colors: ['YELLOW', 'RED'], x: 4, y: 2, orientation: 'VERTICAL', rotation: 0 },
		{ colors: ['BLUE', 'YELLOW'], x: 2, y: 5, orientation: 'HORIZONTAL', rotation: 180 },
	] as const

	// Extract height offset from last hex digit of seed (0-f = 0-15)
	const minY = useMemo(() => {
		const seedHex = seed.toString(16)
		const lastHexDigit = seedHex[seedHex.length - 1] || '0'
		return parseInt(lastHexDigit, 16)
	}, [seed])

	// Get board with viruses
	const { board: boardWithViruses } = useGameBoard({ seed, minY })

	// Manage falling pills
	const { fallingPills, setFallingPills } = useFallingPills({
		initialConfigs: pillConfigs,
		board: boardWithViruses,
		fallSpeed,
		lockDelayFrames,
	})

	// Game loop
	const { currentFrame } = useGameLoop({
		seed,
		minY,
		fallingPills,
		setFallingPills,
		lockedPills,
		setLockedPills,
	})

	// State history tracking
	const currentGameState: GameState = useMemo(
		() => ({
			fallingPills,
			lockedPills,
			seed,
			minY,
			fallSpeed,
			frame: currentFrame,
		}),
		[fallingPills, lockedPills, seed, minY, fallSpeed, currentFrame],
	)

	const { getLatestSnapshot } = useStateHistory({
		state: currentGameState,
		snapshotInterval: 30, // Capture every 30 frames
	})

	const latestSnapshot = getLatestSnapshot()

	// Convert falling pills to regular pills for rendering
	const activePills = useMemo(
		() =>
			fallingPills.map((fallingPill) =>
				createPill({
					colors: [fallingPill.colors[0], fallingPill.colors[1]],
					x: fallingPill.x,
					y: fallingPill.y,
					orientation: fallingPill.orientation,
					rotation: fallingPill.rotation,
				}),
			),
		[fallingPills],
	)

	// Combine active and locked pills
	const allPills = useMemo(() => [...activePills, ...lockedPills], [activePills, lockedPills])

	const boardWithPills = useMemo(
		() =>
			allPills.reduce(
				(currentBoard, pill) => placePillOnBoard({ board: currentBoard, pill }),
				boardWithViruses,
			),
		[allPills, boardWithViruses],
	)

	const handleScramblePills = () => {
		const newFallingPills = scramblePills({
			seed,
			minY,
			fallSpeed,
			lockDelayFrames,
		})
		setFallingPills([...newFallingPills])
		setLockedPills([]) // Reset locked pills when scrambling
	}

	return (
		<main
			style={{
				padding: '2rem',
				display: 'flex',
				flexDirection: 'row',
				gap: '2rem',
				alignItems: 'flex-start',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1.5rem',
					minWidth: '250px',
				}}
			>
				<h1>Dr. Mario</h1>
				<GameControls
					seed={seed}
					minY={minY}
					fallSpeed={fallSpeed}
					onSeedChange={setSeed}
					onFallSpeedChange={setFallSpeed}
					onScramble={handleScramblePills}
				/>
				<SnapshotControls
					snapshot={latestSnapshot}
					setFallingPills={setFallingPills}
					setLockedPills={setLockedPills}
					setSeed={setSeed}
					setFallSpeed={setFallSpeed}
				/>
			</div>
			<div>
				<Grid board={boardWithPills} cellSize={32} />
			</div>
		</main>
	)
}