export const validateFallSpeed = (input: string): number | null => {
	const parsed = parseInt(input, 10)
	if (isNaN(parsed) || parsed <= 0) {
		return null
	}
	return parsed
}

