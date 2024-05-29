import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import Header from './components/Header/Header'

import './globals.css'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Книгоплан',
	description: 'Книги всех жанров на любой вкус',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={manrope.className}>
				<Header />
				<main className="main">{children}</main>
			</body>
		</html>
	)
}
