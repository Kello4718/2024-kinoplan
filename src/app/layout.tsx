import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { FC, PropsWithChildren } from "react";

import Header from "./components/Header/Header";
import BookClubContextProvider from "./context/BookClub";

import "./globals.css";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Книгоплан",
	description: "Книги всех жанров на любой вкус",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
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

export default RootLayout;
