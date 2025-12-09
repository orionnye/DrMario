import { getPillCells } from './get-pill-cells'
import type { Pill } from './pill'

type DoPillsOverlapParams = {
	pill1: Pill
	pill2: Pill
}

export const doPillsOverlap = ({
	pill1,
	pill2,
}: DoPillsOverlapParams): boolean => {
	const cells1 = getPillCells(pill1)
	const cells2 = getPillCells(pill2)

	// Check if any cell from pill1 overlaps with any cell from pill2
	for (const cell1 of cells1) {
		for (const cell2 of cells2) {
			if (cell1.x === cell2.x && cell1.y === cell2.y) {
				return true
			}
		}
	}

	return false
}

