import { describe, test, vi, beforeEach, afterEach } from 'vitest'
import assert from 'riteway'
import { createStateSnapshot } from './state-snapshot'
import { serializeSnapshot, formatSnapshotForDisplay, copySnapshotToClipboard } from './snapshot-display'
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

describe('serializeSnapshot', () => {
	test('should serialize snapshot to JSON string', () => {
		const given = 'state snapshot'
		const should = 'serialize to JSON string'

		const state = createTestState(42)
		const snapshot = createStateSnapshot({ state, frame: 42 })
		const json = serializeSnapshot(snapshot)

		assert({
			given,
			should: 'should return string',
			actual: typeof json === 'string',
			expected: true,
		})

		assert({
			given,
			should: 'should be valid JSON',
			actual: () => {
				JSON.parse(json)
				return true
			},
			expected: true,
		})

		const parsed = JSON.parse(json)
		assert({
			given,
			should: 'should contain frame',
			actual: parsed.frame === 42,
			expected: true,
		})
	})
})

describe('formatSnapshotForDisplay', () => {
	test('should format snapshot as readable string', () => {
		const given = 'state snapshot'
		const should = 'format as readable string'

		const state = createTestState(42)
		const snapshot = createStateSnapshot({ state, frame: 42 })
		const formatted = formatSnapshotForDisplay(snapshot)

		assert({
			given,
			should: 'should return string',
			actual: typeof formatted === 'string',
			expected: true,
		})

		assert({
			given,
			should: 'should include frame',
			actual: formatted.includes('Frame: 42'),
			expected: true,
		})

		assert({
			given,
			should: 'should include seed',
			actual: formatted.includes('Seed: 12345'),
			expected: true,
		})
	})

	test('should include falling pills details', () => {
		const given = 'snapshot with falling pills'
		const should = 'include falling pills details'

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

		const state = {
			fallingPills: [fallingPill],
			lockedPills: [] as const,
			seed: 12345,
			minY: 5,
			fallSpeed: 30,
			frame: 42,
		}

		const snapshot = createStateSnapshot({ state, frame: 42 })
		const formatted = formatSnapshotForDisplay(snapshot)

		assert({
			given,
			should: 'should include falling pills count',
			actual: formatted.includes('Falling Pills: 1'),
			expected: true,
		})

		assert({
			given,
			should: 'should include falling pill details',
			actual: formatted.includes('RED, BLUE') && formatted.includes('(1, 0)'),
			expected: true,
		})
	})
})

describe('copySnapshotToClipboard', () => {
	beforeEach(() => {
		vi.stubGlobal('navigator', {
			clipboard: {
				writeText: vi.fn().mockResolvedValue(undefined),
			},
		})
	})

	afterEach(() => {
		vi.unstubAllGlobals()
	})

	test('should copy snapshot to clipboard as JSON', async () => {
		const given = 'state snapshot'
		const should = 'copy to clipboard as JSON'

		const state = createTestState(42)
		const snapshot = createStateSnapshot({ state, frame: 42 })

		await copySnapshotToClipboard(snapshot)

		assert({
			given,
			should: 'should call clipboard.writeText',
			actual: navigator.clipboard.writeText.mock.calls.length === 1,
			expected: true,
		})

		const writtenText = navigator.clipboard.writeText.mock.calls[0][0]
		const parsed = JSON.parse(writtenText)

		assert({
			given,
			should: 'should write valid JSON',
			actual: parsed.frame === 42,
			expected: true,
		})
	})
})

