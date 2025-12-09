export const EMPTY = 'EMPTY'
export const VIRUS_RED = 'VIRUS_RED'
export const VIRUS_BLUE = 'VIRUS_BLUE'
export const VIRUS_YELLOW = 'VIRUS_YELLOW'
export const PILL_RED = 'PILL_RED'
export const PILL_BLUE = 'PILL_BLUE'
export const PILL_YELLOW = 'PILL_YELLOW'

export type CellState =
	| typeof EMPTY
	| typeof VIRUS_RED
	| typeof VIRUS_BLUE
	| typeof VIRUS_YELLOW
	| typeof PILL_RED
	| typeof PILL_BLUE
	| typeof PILL_YELLOW

