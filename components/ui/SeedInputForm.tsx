import { useState, type FormEvent } from 'react'
import { validateSeed } from '@/lib/validation'
import styles from './InputForm.module.css'

type SeedInputFormProps = {
	readonly onSubmit: (seed: number) => void
}

export const SeedInputForm = ({ onSubmit }: SeedInputFormProps) => {
	const [input, setInput] = useState('')

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		const validated = validateSeed(input)
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
				placeholder="Enter seed"
				className={styles.input}
			/>
			<button type="submit" className={styles.button}>
				Submit
			</button>
		</form>
	)
}

