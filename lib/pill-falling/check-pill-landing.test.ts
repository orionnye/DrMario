import { describe, test } from 'vitest'
import assert from 'riteway'
import { createPill } from '../pill/pill'
import { createFallingPill } from './pill-fall-state'
import { checkPillLanding } from './check-pill-landing'
import { createBoard, setCell } from '@/lib/board-grid'
import { VIRUS_RED, EMPTY } from '@/lib/board-grid/cell-state'

describe('checkPillLanding', () => {
	test('should return true if pill would collide moving down', () => {
		const given = 'pill and board'
		const should = 'return true if pill would collide moving down'

		const board = createBoard({ width: 8, height: 16 })
		const boardWithVirus = setCell({ board, x: 3, y: 6, state: VIRUS_RED })
		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 0, fallSpeed: 30 })
		const actual = checkPillLanding({ fallingPill, board: boardWithVirus })
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return true if pill at bottom row', () => {
		const given = 'pill at bottom row'
		const should = 'return true'

		const board = createBoard({ width: 8, height: 16 })
		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 15,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 0, fallSpeed: 30 })
		const actual = checkPillLanding({ fallingPill, board })
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return false if pill above empty cells', () => {
		const given = 'pill above empty cells'
		const should = 'return false'

		const board = createBoard({ width: 8, height: 16 })
		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 0, fallSpeed: 30 })
		const actual = checkPillLanding({ fallingPill, board })
		const expected = false

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return true for vertical pill at bottom', () => {
		const given = 'vertical pill at bottom'
		const should = 'return true'

		const board = createBoard({ width: 8, height: 16 })
		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 14,
			orientation: 'VERTICAL',
			rotation: 90,
		})
		const fallingPill = createFallingPill({ pill, frameCount: 0, fallSpeed: 30 })
		const actual = checkPillLanding({ fallingPill, board })
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return true if horizontal pill would collide with second cell', () => {
		const given = 'horizontal pill where second cell would collide'
		const should = 'return true'

		const board = createBoard({ width: 8, height: 16 })
		// Place virus at position where second cell of horizontal pill would be
		const boardWithVirus = setCell({ board, x: 4, y: 6, state: VIRUS_RED })
		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
			rotation: 0, // Second cell at x+1
		})
		const fallingPill = createFallingPill({ pill, frameCount: 0, fallSpeed: 30 })
		const actual = checkPillLanding({ fallingPill, board: boardWithVirus })
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should return true if vertical pill would collide with second cell', () => {
		const given = 'vertical pill where second cell would collide'
		const should = 'return true'

		const board = createBoard({ width: 8, height: 16 })
		// Place virus at position where second cell of vertical pill would be
		const boardWithVirus = setCell({ board, x: 3, y: 6, state: VIRUS_RED })
		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'VERTICAL',
			rotation: 90, // Second cell at y+1
		})
		const fallingPill = createFallingPill({ pill, frameCount: 0, fallSpeed: 30 })
		const actual = checkPillLanding({ fallingPill, board: boardWithVirus })
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should not mutate board or pill', () => {
		const given = 'checkPillLanding'
		const should = 'not mutate board or pill'

		const board = createBoard({ width: 8, height: 16 })
		const pill = createPill({
			colors: ['RED', 'BLUE'],
			x: 3,
			y: 5,
			orientation: 'HORIZONTAL',
		})
		const fallingPill = createFallingPill({ pill, frameCount: 0, fallSpeed: 30 })
		const originalY = fallingPill.y
		checkPillLanding({ fallingPill, board })
		const actual = fallingPill.y === originalY
		const expected = true

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

