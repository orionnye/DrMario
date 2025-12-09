import { useState, type FormEvent } from 'react'
import { validateFallSpeed } from '@/lib/validation'
import styles from './InputForm.module.css'

type FallSpeedInputFormProps = {
	readonly onSubmit: (fallSpeed: number) => void
}

export const FallSpeedInputForm = ({ onSubmit }: FallSpeedInputFormProps) => {
	const [input, setInput] = useState('')

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		const validated = validateFallSpeed(input)
		if (validated !== null) {
			onSubmit(validated)
			setInput('')
		}
	}

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input
				type="number"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Enter fall speed"
				min="1"
				className={styles.input}
			/>
			<button type="submit" className={styles.buttonSecondary}>
				Set Fall Speed
			</button>
		</form>
	)
}

