import { describe, test } from 'vitest'
import assert from 'riteway'
import {
	CellState,
	EMPTY,
	VIRUS_RED,
	VIRUS_BLUE,
	VIRUS_YELLOW,
	PILL_RED,
	PILL_BLUE,
	PILL_YELLOW,
} from './cell-state'

describe('Cell State Constants', () => {
	test('should export EMPTY constant', () => {
		const given = 'a cell state definition'
		const should = 'export EMPTY constant'

		const actual = typeof EMPTY
		const expected = 'string'

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should export VIRUS_RED constant', () => {
		const given = 'a cell state definition'
		const should = 'export VIRUS_RED constant'

		const actual = typeof VIRUS_RED
		const expected = 'string'

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should export VIRUS_BLUE constant', () => {
		const given = 'a cell state definition'
		const should = 'export VIRUS_BLUE constant'

		const actual = typeof VIRUS_BLUE
		const expected = 'string'

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should export VIRUS_YELLOW constant', () => {
		const given = 'a cell state definition'
		const should = 'export VIRUS_YELLOW constant'

		const actual = typeof VIRUS_YELLOW
		const expected = 'string'

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should export PILL_RED constant', () => {
		const given = 'a cell state definition'
		const should = 'export PILL_RED constant'

		const actual = typeof PILL_RED
		const expected = 'string'

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should export PILL_BLUE constant', () => {
		const given = 'a cell state definition'
		const should = 'export PILL_BLUE constant'

		const actual = typeof PILL_BLUE
		const expected = 'string'

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should export PILL_YELLOW constant', () => {
		const given = 'a cell state definition'
		const should = 'export PILL_YELLOW constant'

		const actual = typeof PILL_YELLOW
		const expected = 'string'

		assert({
			given,
			should,
			actual,
			expected,
		})
	})

	test('should provide CellState type definition', () => {
		const given = 'a cell state value'
		const should = 'be assignable to CellState type'

		const actual: CellState = EMPTY
		const expected = EMPTY

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

