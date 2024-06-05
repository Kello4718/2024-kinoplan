'use client';

import Link from 'next/link';
import React from 'react';

import { usePathname } from 'next/navigation';
import Cart from './Cart/Cart';

import styles from './Header.module.css';
import { useBookClub } from '@/app/hooks';

const Header = () => {
	const pathname = usePathname();
	const { cart } = useBookClub();
	return (
		<header className={styles.header}>
			<Link
				href="/"
				className="logoLink"
				style={pathname === '/' ? { pointerEvents: 'none' } : {}}
			>
				Книгоплан
			</Link>
			{cart.length > 0 && pathname === '/' && <Cart />}
		</header>
	);
};

export default Header;
