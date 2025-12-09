import { describe, test } from 'vitest'
import assert from 'riteway'
import { createPill } from './pill'
import { getPillCells } from './get-pill-cells'

describe('getPillCells Edge Cases', () => {
	test('should handle HORIZONTAL orientation with rotation 90 (should place vertically)', () => {
		const given = 'HORIZONTAL orientation with rotation 90'
		const should = 'place cells vertically based on rotation'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
			rotation: 90,
		})
		const cells = getPillCells(pill)
		const actual = cells.length === 2 && cells[0].x === 3 && cells[0].y === 5 && cells[1].x === 3 && cells[1].y === 6
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should handle VERTICAL orientation with rotation 0 (should place horizontally)', () => {
		const given = 'VERTICAL orientation with rotation 0'
		const should = 'place cells horizontally based on rotation'

		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'VERTICAL',
			rotation: 0,
		})
		const cells = getPillCells(pill)
		const actual = cells.length === 2 && cells[0].x === 3 && cells[0].y === 5 && cells[1].x === 4 && cells[1].y === 5
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should always return exactly 2 cells', () => {
		const given = 'any pill'
		const should = 'always return exactly 2 cells'

		const rotations: (0 | 90 | 180 | 270)[] = [0, 90, 180, 270]
		const orientations: ('HORIZONTAL' | 'VERTICAL')[] = ['HORIZONTAL', 'VERTICAL']

		for (const rotation of rotations) {
			for (const orientation of orientations) {
				const pill = createPill({
					colors: ['RED', 'BLUE'],
					x: 3,
					y: 5,
					orientation,
					rotation,
				})
				const cells = getPillCells(pill)
				const actual = cells.length === 2
				const expected = true

				assert({
					given: `${orientation} with rotation ${rotation}`,
					should,
					actual,
					expected,
				})
			}
		}
	})

	test('should never place both cells at same position', () => {
		const given = 'any pill'
		const should = 'never place both cells at same position'

		const rotations: (0 | 90 | 180 | 270)[] = [0, 90, 180, 270]
		const orientations: ('HORIZONTAL' | 'VERTICAL')[] = ['HORIZONTAL', 'VERTICAL']

		for (const rotation of rotations) {
			for (const orientation of orientations) {
				const pill = createPill({
					colors: ['RED', 'BLUE'],
					x: 3,
					y: 5,
					orientation,
					rotation,
				})
				const cells = getPillCells(pill)
				const samePosition = cells[0].x === cells[1].x && cells[0].y === cells[1].y
				const actual = !samePosition
				const expected = true

				assert({
					given: `${orientation} with rotation ${rotation}`,
					should,
					actual,
					expected,
				})
			}
		}
	})
})

