import type { StateSnapshot } from './state-snapshot'

/**
 * Serialize snapshot to JSON string for display/export
 * 
 * @param snapshot - State snapshot to serialize
 * @returns JSON string representation of snapshot
 */
export const serializeSnapshot = (snapshot: StateSnapshot): string => {
	return JSON.stringify(snapshot, null, 2)
}

/**
 * Format snapshot as readable string for display
 * 
 * @param snapshot - State snapshot to format
 * @returns Human-readable string representation
 */
export const formatSnapshotForDisplay = (snapshot: StateSnapshot): string => {
	const lines = [
		`Frame: ${snapshot.frame}`,
		`Timestamp: ${new Date(snapshot.timestamp).toISOString()}`,
		`Seed: ${snapshot.seed}`,
		`MinY: ${snapshot.minY}`,
		`FallSpeed: ${snapshot.fallSpeed}`,
		`Falling Pills: ${snapshot.fallingPills.length}`,
		`Locked Pills: ${snapshot.lockedPills.length}`,
	]

	if (snapshot.fallingPills.length > 0) {
		lines.push('\nFalling Pills:')
		snapshot.fallingPills.forEach((pill, index) => {
			lines.push(
				`  ${index + 1}. Colors: [${pill.colors.join(', ')}], Position: (${pill.x}, ${pill.y}), Rotation: ${pill.rotation}°, FrameCount: ${pill.frameCount}`,
			)
		})
	}

	if (snapshot.lockedPills.length > 0) {
		lines.push('\nLocked Pills:')
		snapshot.lockedPills.forEach((pill, index) => {
			lines.push(
				`  ${index + 1}. Colors: [${pill.colors.join(', ')}], Position: (${pill.x}, ${pill.y}), Rotation: ${pill.rotation}°`,
			)
		})
	}

	return lines.join('\n')
}

/**
 * Copy snapshot to clipboard as JSON
 * 
 * @param snapshot - State snapshot to copy
 * @returns Promise that resolves when copied
 */
export const copySnapshotToClipboard = async (snapshot: StateSnapshot): Promise<void> => {
	const json = serializeSnapshot(snapshot)
	await navigator.clipboard.writeText(json)
}

