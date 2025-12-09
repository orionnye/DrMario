'use client'

import { useState } from 'react'
import type { StateSnapshot } from '@/lib/state-history/state-snapshot'
import { serializeSnapshot, formatSnapshotForDisplay, copySnapshotToClipboard } from '@/lib/state-history/snapshot-display'
import { deserializeSnapshot } from '@/lib/state-history/snapshot-restore'
import { restoreState } from '@/lib/state-history/restore-state'
import type { FallingPill } from '@/lib/pill-falling/pill-fall-state'
import type { Pill } from '@/lib/pill/pill'
import styles from './InputForm.module.css'

type SnapshotControlsProps = {
	readonly snapshot: StateSnapshot | null
	readonly setFallingPills: (value: FallingPill[]) => void
	readonly setLockedPills: (value: Pill[]) => void
	readonly setSeed: (value: number) => void
	readonly setMinY?: (value: number) => void
	readonly setFallSpeed: (value: number) => void
}

export const SnapshotControls = ({
	snapshot,
	setFallingPills,
	setLockedPills,
	setSeed,
	setMinY,
	setFallSpeed,
}: SnapshotControlsProps) => {
	const [snapshotJson, setSnapshotJson] = useState('')
	const [displayMode, setDisplayMode] = useState<'formatted' | 'json'>('formatted')

	if (!snapshot) {
		return (
			<div className={styles.container}>
				<h3>Snapshot</h3>
				<p>No snapshot available</p>
			</div>
		)
	}

	const handleCopySnapshot = async () => {
		await copySnapshotToClipboard(snapshot)
		alert('Snapshot copied to clipboard!')
	}

	const handleRestoreFromJson = () => {
		const restored = deserializeSnapshot(snapshotJson)
		if (!restored) {
			alert('Invalid snapshot JSON')
			return
		}

		restoreState({
			snapshot: restored,
			setFallingPills,
			setLockedPills,
			setSeed,
			setMinY,
			setFallSpeed,
		})

		alert('State restored from snapshot!')
		setSnapshotJson('')
	}

	return (
		<div className={styles.container}>
			<h3>Snapshot (Frame {snapshot.frame})</h3>

			<div style={{ marginBottom: '1rem' }}>
				<button
					type="button"
					onClick={() => setDisplayMode(displayMode === 'formatted' ? 'json' : 'formatted')}
					className={styles.button}
				>
					{displayMode === 'formatted' ? 'Show JSON' : 'Show Formatted'}
				</button>
				<button type="button" onClick={handleCopySnapshot} className={styles.button}>
					Copy Snapshot
				</button>
			</div>

			{displayMode === 'formatted' ? (
				<pre
					style={{
						backgroundColor: '#f5f5f5',
						padding: '1rem',
						borderRadius: '4px',
						fontSize: '0.875rem',
						maxHeight: '300px',
						overflow: 'auto',
						whiteSpace: 'pre-wrap',
						wordBreak: 'break-word',
					}}
				>
					{formatSnapshotForDisplay(snapshot)}
				</pre>
			) : (
				<pre
					style={{
						backgroundColor: '#f5f5f5',
						padding: '1rem',
						borderRadius: '4px',
						fontSize: '0.75rem',
						maxHeight: '300px',
						overflow: 'auto',
					}}
				>
					{serializeSnapshot(snapshot)}
				</pre>
			)}

			<div style={{ marginTop: '1rem' }}>
				<h4>Restore from JSON</h4>
				<textarea
					value={snapshotJson}
					onChange={(e) => setSnapshotJson(e.target.value)}
					placeholder="Paste snapshot JSON here..."
					style={{
						width: '100%',
						minHeight: '100px',
						padding: '0.5rem',
						fontFamily: 'monospace',
						fontSize: '0.75rem',
						border: '1px solid #ccc',
						borderRadius: '4px',
					}}
				/>
				<button
					type="button"
					onClick={handleRestoreFromJson}
					disabled={!snapshotJson.trim()}
					className={styles.button}
					style={{ marginTop: '0.5rem' }}
				>
					Restore from JSON
				</button>
			</div>
		</div>
	)
}

