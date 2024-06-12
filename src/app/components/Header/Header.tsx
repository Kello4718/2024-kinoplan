"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Cart from "./Cart/Cart";

import styles from "./Header.module.css";
import User from "./User/User";

const Header = () => {
	const pathname = usePathname();
	const isMainPage = pathname === "/";
	return (
		<header className={styles.header}>
			<Link href="/" className={`logo ${isMainPage ? "" : "logoLink"}`}>
				Книгоплан
			</Link>
			{isMainPage && <Cart />}
			<User />
		</header>
	);
};

export default Header;
