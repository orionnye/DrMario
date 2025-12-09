import { CellState } from '@/lib/board-grid/cell-state'
import styles from './Grid.module.css'

type CellProps = {
	state: CellState
	size: number
}

export const Cell = ({ state, size }: CellProps) => {
	return (
		<div
			data-testid="cell"
			data-state={state}
			className={styles.cell}
			style={{
				width: `${size}px`,
				height: `${size}px`,
			}}
		/>
	)
}

