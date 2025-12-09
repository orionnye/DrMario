import { describe, test } from 'vitest'
import assert from 'riteway'
import { generateVirusPlacement } from './generate-virus-placement'
import { Board } from '@/lib/board-grid/board'

describe('generateVirusPlacement', () => {
	const board: Board = { width: 8, height: 16, cells: [] }

	test('should generate array of virus placements with x, y, color', () => {
		const given = 'virus count and seed'
		const should = 'generate array of virus placements with x, y, color'

		const placements = generateVirusPlacement({ board, count: 3, seed: 123 })
		const actual = placements.length > 0 && typeof placements[0].x === 'number' && typeof placements[0].y === 'number' && typeof placements[0].color === 'string'
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should generate identical placements for same seed', () => {
		const given = 'same seed'
		const should = 'generate identical placements'

		const placements1 = generateVirusPlacement({ board, count: 5, seed: 456 })
		const placements2 = generateVirusPlacement({ board, count: 5, seed: 456 })
		const actual = JSON.stringify(placements1)
		const expected = JSON.stringify(placements2)

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should generate different placements for different seed', () => {
		const given = 'different seed'
		const should = 'generate different placements'

		const placements1 = generateVirusPlacement({ board, count: 5, seed: 789 })
		const placements2 = generateVirusPlacement({ board, count: 5, seed: 999 })
		const actual = JSON.stringify(placements1)
		const expected = JSON.stringify(placements2)

		assert({
			given,
			should,
			actual: actual !== expected,
			expected: true,
		})
	})

	test('should generate exactly the requested virus count', () => {
		const given = 'virus count'
		const should = 'generate exactly that many viruses'

		const placements = generateVirusPlacement({ board, count: 10, seed: 123 })
		const actual = placements.length
		const expected = 10

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should distribute viruses avoiding overlaps', () => {
		const given = 'virus placements'
		const should = 'distribute across board avoiding overlaps'

		const placements = generateVirusPlacement({ board, count: 20, seed: 123 })
		const positions = new Set(placements.map(p => `${p.x},${p.y}`))
		const actual = positions.size
		const expected = placements.length

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should generate valid virus colors', () => {
		const given = 'virus placements'
		const should = 'generate valid virus colors'

		const placements = generateVirusPlacement({ board, count: 10, seed: 123 })
		const validColors = ['RED', 'BLUE', 'YELLOW']
		const actual = placements.every(p => validColors.includes(p.color))
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should generate coordinates within board bounds', () => {
		const given = 'virus placements'
		const should = 'generate coordinates within board bounds'

		const placements = generateVirusPlacement({ board, count: 10, seed: 123 })
		const actual = placements.every(p => p.x >= 0 && p.x < board.width && p.y >= 0 && p.y < board.height)
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

