'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Cart from './Cart/Cart';

import styles from './Header.module.css';

const Header = () => {
	const pathname = usePathname();
	return (
		<header className={styles.header}>
			<Link
				href="/"
				className="logoLink"
				style={pathname === '/' ? { pointerEvents: 'none' } : {}}
			>
				Книгоплан
			</Link>
			{pathname === '/' && <Cart />}
		</header>
	);
};

export default Header;
