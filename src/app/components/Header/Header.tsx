'use client';

import Link from 'next/link';
import React from 'react';

import { usePathname } from 'next/navigation';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Popover } from 'antd';
import Cart from './Cart/Cart';

import styles from './Header.module.css';
import { useBookClub } from '@/app/hooks';

const Header = () => {
	const pathname = usePathname();
	const { cart } = useBookClub();
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>Книгоплан</h1>
			<nav className={styles.navigation}>
				<ul className={styles.navigationList}>
					<li className={styles.navigationItem}>
						<Link
							className={
								pathname === '/' ? 'navigationLinkActive' : ''
							}
							href="/"
						>
							Главная
						</Link>
					</li>
					<li className={styles.navigationItem}>
						<Link
							className={
								pathname === '/cart'
									? 'navigationLinkActive'
									: ''
							}
							href="/cart"
						>
							Корзина
						</Link>
					</li>
				</ul>
				<Popover
					placement="bottomRight"
					trigger={'click'}
					content={<Cart />}
					className={styles.popover}
				>
					<Badge count={cart.length}>
						<ShoppingCartOutlined className={styles.cart} />
					</Badge>
				</Popover>
			</nav>
		</header>
	);
};

export default Header;
