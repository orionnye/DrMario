import { Board } from '@/lib/board-grid/board'
import { getCell } from '@/lib/board-grid/get-cell'
import { Cell } from './Cell'
import styles from './Grid.module.css'

type GridProps = {
	board: Board
	cellSize: number
}

export const Grid = ({ board, cellSize }: GridProps) => {
	const cells = []
	for (let y = 0; y < board.height; y++) {
		for (let x = 0; x < board.width; x++) {
			const cellState = getCell({ board, x, y })
			cells.push(
				<Cell key={`${x}-${y}`} state={cellState} size={cellSize} />,
			)
		}
	}

	return (
		<div
			data-testid="grid"
			className={styles.grid}
			style={{
				gridTemplateColumns: `repeat(${board.width}, ${cellSize}px)`,
			}}
		>
			{cells}
		</div>
	)
}

