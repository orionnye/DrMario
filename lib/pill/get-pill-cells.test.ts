import { describe, test } from 'vitest'
import assert from 'riteway'
import { createPill } from './pill'
import { getPillCells } from './get-pill-cells'

describe('getPillCells', () => {
	test('should return array of cell positions with colors', () => {
		const given = 'pill'
		const should = 'return array of cell positions with colors'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 0,
			orientation: 'HORIZONTAL',
		})
		const cells = getPillCells(pill)
		const actual = Array.isArray(cells) && cells.length === 2 && typeof cells[0].x === 'number' && typeof cells[0].color === 'string'
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return two adjacent cells horizontally for horizontal pill', () => {
		const given = 'horizontal pill'
		const should = 'return two adjacent cells horizontally'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const cells = getPillCells(pill)
		const actual1 = cells[0].x === 3 && cells[0].y === 5 && cells[0].color === 'RED'
		const actual2 = cells[1].x === 4 && cells[1].y === 5 && cells[1].color === 'BLUE'
		const expected = true

		assert({
			given,
			should: 'first cell at (3,5) with RED',
			actual: actual1,
			expected,
		})

		assert({
			given,
			should: 'second cell at (4,5) with BLUE',
			actual: actual2,
			expected,
		})
	})

	test('should return two adjacent cells vertically for vertical pill', () => {
		const given = 'vertical pill'
		const should = 'return two adjacent cells vertically'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 2,
			y: 3,
			orientation: 'VERTICAL',
		})
		const cells = getPillCells(pill)
		const actual1 = cells[0].x === 2 && cells[0].y === 3 && cells[0].color === 'RED'
		const actual2 = cells[1].x === 2 && cells[1].y === 4 && cells[1].color === 'BLUE'
		const expected = true

		assert({
			given,
			should: 'first cell at (2,3) with RED',
			actual: actual1,
			expected,
		})

		assert({
			given,
			should: 'second cell at (2,4) with BLUE',
			actual: actual2,
			expected,
		})
	})

	test('should calculate cells based on rotation state (90 degrees)', () => {
		const given = 'rotated pill'
		const should = 'calculate cells based on rotation state'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
			rotation: 0,
		})
		const rotatedPill = createPill({
			colors: pill.colors,
			x: pill.x,
			y: pill.y,
			orientation: 'VERTICAL',
			rotation: 90,
		})
		const cells = getPillCells(rotatedPill)
		const actual = cells[0].x === 3 && cells[0].y === 5 && cells[1].x === 3 && cells[1].y === 6
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should calculate cells based on rotation state (180 degrees)', () => {
		const given = 'rotated pill at 180 degrees'
		const should = 'calculate cells based on rotation state'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
			rotation: 180,
		})
		const cells = getPillCells(pill)
		// At 180 degrees, colors are swapped and direction reversed
		const actual = cells[0].x === 2 && cells[0].y === 5 && cells[1].x === 3 && cells[1].y === 5
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should calculate cells based on rotation state (270 degrees)', () => {
		const given = 'rotated pill at 270 degrees'
		const should = 'calculate cells based on rotation state'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'VERTICAL',
			rotation: 270,
		})
		const cells = getPillCells(pill)
		// At 270 degrees, should be vertical but reversed
		const actual = cells[0].x === 3 && cells[0].y === 4 && cells[1].x === 3 && cells[1].y === 5
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

