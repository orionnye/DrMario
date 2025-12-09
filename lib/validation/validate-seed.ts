export const validateSeed = (input: string): number | null => {
	const parsed = parseInt(input, 10)
	if (isNaN(parsed)) {
		return null
	}
	return parsed
}

