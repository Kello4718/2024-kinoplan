import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';

import Header from './components/Header/Header';

import './globals.css';
import BookClubContextProvider from './context/BookClub';

const manrope = Manrope({ subsets: ['latin'] });

const metadata: Metadata = {
	title: 'Книгоплан',
	description: 'Книги всех жанров на любой вкус',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang="ru">
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body className={manrope.className}>
				<BookClubContextProvider>
					<Header />
					<main className="main">{children}</main>
				</BookClubContextProvider>
			</body>
		</html>
	);
};

export { metadata };
export default RootLayout;
