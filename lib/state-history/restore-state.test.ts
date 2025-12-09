import { describe, test } from 'vitest'
import assert from 'riteway'
import type { StateSnapshot } from './state-snapshot'
import { createStateSnapshot } from './state-snapshot'
import { restoreState } from './restore-state'
import { createPill } from '../pill/pill'
import { createFallingPill } from '../pill-falling/pill-fall-state'

const createTestState = (frame: number) => ({
	fallingPills: [] as const,
	lockedPills: [] as const,
	seed: 12345,
	minY: 5,
	fallSpeed: 30,
	frame,
})

describe('restoreState', () => {
	test('should restore fallingPills to snapshot values', () => {
		const given = 'state snapshot with falling pills'
		const should = 'restore fallingPills to snapshot values'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 1,
			y: 0,
			orientation: 'HORIZONTAL',
		})

		const fallingPill = createFallingPill({
			pill,
			frameCount: 10,
			fallSpeed: 30,
		})

		const snapshotState = {
			fallingPills: [fallingPill],
			lockedPills: [] as const,
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 42,
		}

		const snapshot = createStateSnapshot({ state: snapshotState, frame: 42 })

		const setFallingPills = (value: typeof fallingPill[]) => {
			// Mock setter
		}
		const setLockedPills = (value: ReturnType<typeof createPill>[]) => {
			// Mock setter
		}
		const setSeed = (value: number) => {
			// Mock setter
		}
		const setMinY = (value: number) => {
			// Mock setter
		}
		const setFallSpeed = (value: number) => {
			// Mock setter
		}

		let restoredFallingPills: typeof fallingPill[] = []
		const mockSetFallingPills = (value: typeof fallingPills) => {
			restoredFallingPills = value
		}

		restoreState({
			snapshot,
			setFallingPills: mockSetFallingPills,
			setLockedPills,
			setSeed,
			setMinY,
			setFallSpeed,
		})

		assert({
			given,
			should,
			actual: restoredFallingPills.length === 1 && restoredFallingPills[0].x === 1,
			expected: true,
		})
	})

	test('should restore lockedPills to snapshot values', () => {
		const given = 'state snapshot with locked pills'
		const should = 'restore lockedPills to snapshot values'

		const lockedPill = createPill({
			colors: ['YELLOW', 'RED'],
			x: 3,
			y: 10,
			orientation: 'VERTICAL',
		})

		const snapshotState = {
			fallingPills: [] as const,
			lockedPills: [lockedPill],
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 42,
		}

		const snapshot = createStateSnapshot({ state: snapshotState, frame: 42 })

		let restoredLockedPills: ReturnType<typeof createPill>[] = []
		const mockSetLockedPills = (value: ReturnType<typeof createPill>[]) => {
			restoredLockedPills = value
		}

		restoreState({
			snapshot,
			setFallingPills: () => {},
			setLockedPills: mockSetLockedPills,
			setSeed: () => {},
			setMinY: () => {},
			setFallSpeed: () => {},
		})

		assert({
			given,
			should,
			actual: restoredLockedPills.length === 1 && restoredLockedPills[0].x === 3,
			expected: true,
		})
	})

	test('should restore seed and minY to snapshot values', () => {
		const given = 'state snapshot with seed and minY'
		const should = 'restore seed and minY to snapshot values'

		const snapshotState = {
			fallingPills: [] as const,
			lockedPills: [] as const,
			seed: 99999,
			minY: 10,
			fallSpeed: 30,
			frame: 42,
		}

		const snapshot = createStateSnapshot({ state: snapshotState, frame: 42 })

		let restoredSeed = 0
		let restoredMinY = 0
		const mockSetSeed = (value: number) => {
			restoredSeed = value
		}
		const mockSetMinY = (value: number) => {
			restoredMinY = value
		}

		restoreState({
			snapshot,
			setFallingPills: () => {},
			setLockedPills: () => {},
			setSeed: mockSetSeed,
			setMinY: mockSetMinY,
			setFallSpeed: () => {},
		})

		assert({
			given,
			should: 'should restore seed',
			actual: restoredSeed === 99999,
			expected: true,
		})

		assert({
			given,
			should: 'should restore minY',
			actual: restoredMinY === 10,
			expected: true,
		})
	})

	test('should update all state setters atomically', () => {
		const given = 'state snapshot'
		const should = 'update all state setters atomically'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 1,
			y: 0,
			orientation: 'HORIZONTAL',
		})

		const fallingPill = createFallingPill({
			pill,
			frameCount: 5,
			fallSpeed: 30,
		})

		const snapshotState = {
			fallingPills: [fallingPill],
			lockedPills: [] as const,
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 42,
		}

		const snapshot = createStateSnapshot({ state: snapshotState, frame: 42 })

		let callOrder: string[] = []
		const mockSetFallingPills = () => {
			callOrder.push('fallingPills')
		}
		const mockSetLockedPills = () => {
			callOrder.push('lockedPills')
		}
		const mockSetSeed = () => {
			callOrder.push('seed')
		}
		const mockSetMinY = () => {
			callOrder.push('minY')
		}
		const mockSetFallSpeed = () => {
			callOrder.push('fallSpeed')
		}

		restoreState({
			snapshot,
			setFallingPills: mockSetFallingPills,
			setLockedPills: mockSetLockedPills,
			setSeed: mockSetSeed,
			setMinY: mockSetMinY,
			setFallSpeed: mockSetFallSpeed,
		})

		assert({
			given,
			should: 'should call all setters',
			actual: callOrder.length === 5,
			expected: true,
		})

		assert({
			given,
			should: 'should call all required setters',
			actual:
				callOrder.includes('fallingPills') &&
				callOrder.includes('lockedPills') &&
				callOrder.includes('seed') &&
				callOrder.includes('minY') &&
				callOrder.includes('fallSpeed'),
			expected: true,
		})
	})

	test('should not mutate snapshot', () => {
		const given = 'state snapshot'
		const should = 'not mutate snapshot'

		const snapshotState = {
			fallingPills: [] as const,
			lockedPills: [] as const,
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 42,
		}

		const snapshot = createStateSnapshot({ state: snapshotState, frame: 42 })
		const originalSeed = snapshot.seed
		const originalMinY = snapshot.minY

		restoreState({
			snapshot,
			setFallingPills: () => {},
			setLockedPills: () => {},
			setSeed: () => {},
			setMinY: () => {},
			setFallSpeed: () => {},
		})

		assert({
			given,
			should,
			actual: snapshot.seed === originalSeed && snapshot.minY === originalMinY,
			expected: true,
		})
	})

	test('should not restore state if snapshot is invalid', () => {
		const given = 'invalid snapshot'
		const should = 'not restore state'

		let wasCalled = false
		const mockSetFallingPills = () => {
			wasCalled = true
		}

		// Invalid snapshot - missing required properties
		const invalidSnapshot = {
			fallingPills: null,
			lockedPills: [] as const,
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 42,
			timestamp: Date.now(),
		} as unknown as StateSnapshot

		restoreState({
			snapshot: invalidSnapshot,
			setFallingPills: mockSetFallingPills,
			setLockedPills: () => {},
			setSeed: () => {},
			setMinY: () => {},
			setFallSpeed: () => {},
		})

		assert({
			given,
			should,
			actual: !wasCalled,
			expected: true,
		})
	})
})

