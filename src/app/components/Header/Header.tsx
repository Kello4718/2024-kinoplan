'use client'

import Link from 'next/link'
import React from 'react'

import styles from './Header.module.css'

import { usePathname } from 'next/navigation'
const Header = () => {
	const pathname = usePathname()
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
			</nav>
		</header>
	)
}

export default Header
