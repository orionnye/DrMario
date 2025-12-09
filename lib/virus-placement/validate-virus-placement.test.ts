import { describe, test } from 'vitest'
import assert from 'riteway'
import { validateVirusPlacement } from './validate-virus-placement'
import { createBoard } from '@/lib/board-grid/board'
import type { VirusPlacement } from './generate-virus-placement'

describe('validateVirusPlacement', () => {
	const board = createBoard({ width: 8, height: 16 })

	test('should ensure all coordinates are within board bounds', () => {
		const given = 'virus placements'
		const should = 'ensure all coordinates are within board bounds'

		const placements: VirusPlacement[] = [
			{ x: 0, y: 0, color: 'RED' },
			{ x: 7, y: 15, color: 'BLUE' },
			{ x: 8, y: 0, color: 'YELLOW' }, // Invalid: x out of bounds
		]
		const result = validateVirusPlacement({ board, placements })
		const actual = result.valid
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return valid true for placements within bounds', () => {
		const given = 'valid virus placements'
		const should = 'return valid true'

		const placements: VirusPlacement[] = [
			{ x: 0, y: 0, color: 'RED' },
			{ x: 7, y: 15, color: 'BLUE' },
			{ x: 4, y: 8, color: 'YELLOW' },
		]
		const result = validateVirusPlacement({ board, placements })
		const actual = result.valid
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should ensure no two viruses share same position', () => {
		const given = 'virus placements'
		const should = 'ensure no two viruses share same position'

		const placements: VirusPlacement[] = [
			{ x: 2, y: 14, color: 'RED' },
			{ x: 2, y: 14, color: 'BLUE' }, // Duplicate position
		]
		const result = validateVirusPlacement({ board, placements })
		const actual = result.valid
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return valid true when no duplicates', () => {
		const given = 'virus placements without duplicates'
		const should = 'return valid true'

		const placements: VirusPlacement[] = [
			{ x: 0, y: 0, color: 'RED' },
			{ x: 1, y: 0, color: 'BLUE' },
			{ x: 0, y: 1, color: 'YELLOW' },
		]
		const result = validateVirusPlacement({ board, placements })
		const actual = result.valid
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return error message for invalid placements', () => {
		const given = 'invalid placements'
		const should = 'return error message'

		const placements: VirusPlacement[] = [
			{ x: 10, y: 0, color: 'RED' }, // Out of bounds
		]
		const result = validateVirusPlacement({ board, placements })
		const actual = typeof result.error === 'string' && result.error.length > 0
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return no error for valid placements', () => {
		const given = 'valid placements'
		const should = 'return no error'

		const placements: VirusPlacement[] = [
			{ x: 0, y: 0, color: 'RED' },
		]
		const result = validateVirusPlacement({ board, placements })
		const actual = result.error === undefined || result.error === null
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

