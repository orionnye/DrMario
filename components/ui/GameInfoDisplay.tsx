type GameInfoDisplayProps = {
	readonly seed: number
	readonly minY: number
	readonly fallSpeed: number
}

export const GameInfoDisplay = ({ seed, minY, fallSpeed }: GameInfoDisplayProps) => {
	const seedHex = seed.toString(16)
	const lastHexDigit = seedHex[seedHex.length - 1] || '0'

	return (
		<>
			<div>
				<strong>Current Seed:</strong> {seed} (hex: {seedHex})
			</div>
			<div>
				<strong>Height Offset:</strong> {minY} (from last hex digit: {lastHexDigit})
			</div>
			<div>
				<strong>Fall Speed:</strong> {fallSpeed} frames per cell
			</div>
		</>
	)
}

