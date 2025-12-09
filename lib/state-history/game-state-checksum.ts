import type { GameState } from './game-state'
import type { Pill } from '../pill/pill'

/**
 * Simple hash function for string (djb2 algorithm)
 */
const hashString = (str: string): string => {
	let hash = 5381
	for (let i = 0; i < str.length; i++) {
		hash = ((hash << 5) + hash) + str.charCodeAt(i)
		hash = hash & 0xffffffff // Convert to 32-bit integer
	}
	// Convert to positive hex string
	return Math.abs(hash).toString(16)
}

/**
 * Comparator function for sorting pills by position, rotation, and color
 * Ensures deterministic ordering for hash generation
 */
const comparePills = (a: Pill, b: Pill): number => {
	if (a.x !== b.x) return a.x - b.x
	if (a.y !== b.y) return a.y - b.y
	if (a.rotation !== b.rotation) return a.rotation - b.rotation
	return a.colors[0].localeCompare(b.colors[0])
}

/**
 * Serialize game state to deterministic JSON string
 * Ensures consistent ordering of properties and arrays
 */
const serializeState = (state: GameState): string => {
	return JSON.stringify({
		fallingPills: [...state.fallingPills].sort(comparePills),
		lockedPills: [...state.lockedPills].sort(comparePills),
		seed: state.seed,
		minY: state.minY,
		fallSpeed: state.fallSpeed,
		frame: state.frame,
	})
}

// Cache for memoization - stores hash by state object reference
const hashCache = new WeakMap<GameState, string>()

/**
 * Generate deterministic checksum/hash for game state
 * Uses memoization to cache hashes for the same state object reference
 * 
 * @param state - Game state to generate checksum for
 * @returns Hexadecimal string hash of the state
 */
export const generateStateChecksum = (state: GameState): string => {
	// Check cache first (only works if same state object is reused)
	const cached = hashCache.get(state)
	if (cached !== undefined) {
		return cached
	}

	const serialized = serializeState(state)
	const hash = hashString(serialized)
	
	// Cache the hash for this state object
	hashCache.set(state, hash)
	
	return hash
}

