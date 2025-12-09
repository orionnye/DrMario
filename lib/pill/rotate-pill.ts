import type { Pill } from './pill'

type RotationDirection = 'CLOCKWISE' | 'COUNTER_CLOCKWISE'

export const rotatePill = (
	pill: Pill,
	direction: RotationDirection,
): Pill => {
	const rotationDelta = direction === 'CLOCKWISE' ? 90 : -90
	const newRotation = ((pill.rotation + rotationDelta + 360) % 360) as
		| 0
		| 90
		| 180
		| 270

	// Orientation changes: HORIZONTAL at 0/180, VERTICAL at 90/270
	const newOrientation =
		newRotation === 0 || newRotation === 180 ? 'HORIZONTAL' : 'VERTICAL'

	return {
		...pill,
		rotation: newRotation,
		orientation: newOrientation,
	}
}

