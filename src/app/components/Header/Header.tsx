"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Cart from "./Cart/Cart";

import styles from "./Header.module.css";

const Header = () => {
	const pathname = usePathname();
	const isMainPage = pathname === "/";
	return (
		<header className={styles.header}>
			<Link href="/" className={`logo ${isMainPage ? "" : "logoLink"}`}>
				Книгоплан
			</Link>
			{isMainPage && <Cart />}
		</header>
	);
};

export default Header;
