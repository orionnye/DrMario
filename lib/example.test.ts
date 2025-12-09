import { describe, test } from 'vitest'
import assert from 'riteway'

describe('Example test', () => {
	test('should verify testing setup works', async () => {
		const given = 'a test setup'
		const should = 'pass a simple assertion'

		const actual = 1 + 1
		const expected = 2

		assert({
			given,
			should,
			actual,
			expected,
		})
	})
})

