import styles from './ScrambleButton.module.css'

type ScrambleButtonProps = {
	readonly onClick: () => void
}

export const ScrambleButton = ({ onClick }: ScrambleButtonProps) => {
	return (
		<button onClick={onClick} className={styles.button}>
			Scramble Pills
		</button>
	)
}

