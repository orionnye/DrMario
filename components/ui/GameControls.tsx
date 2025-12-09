import { GameInfoDisplay } from './GameInfoDisplay'
import { SeedInputForm } from './SeedInputForm'
import { FallSpeedInputForm } from './FallSpeedInputForm'
import { ScrambleButton } from './ScrambleButton'
import styles from './GameControls.module.css'

type GameControlsProps = {
	readonly seed: number
	readonly minY: number
	readonly fallSpeed: number
	readonly onSeedChange: (seed: number) => void
	readonly onFallSpeedChange: (fallSpeed: number) => void
	readonly onScramble: () => void
}

export const GameControls = ({
	seed,
	minY,
	fallSpeed,
	onSeedChange,
	onFallSpeedChange,
	onScramble,
}: GameControlsProps) => {
	return (
		<div className={styles.container}>
			<GameInfoDisplay seed={seed} minY={minY} fallSpeed={fallSpeed} />
			<SeedInputForm onSubmit={onSeedChange} />
			<FallSpeedInputForm onSubmit={onFallSpeedChange} />
			<ScrambleButton onClick={onScramble} />
		</div>
	)
}

