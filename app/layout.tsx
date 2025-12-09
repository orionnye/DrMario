import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Dr. Mario',
	description: 'A Dr. Mario game built with Next.js and TypeScript',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}

