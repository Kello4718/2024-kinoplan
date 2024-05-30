'use client';

import { BookClubContext, TBookClubContext } from '@/app/context/BookClub';
import React, { useContext } from 'react';

import styles from './Cart.module.css';
import Link from 'next/link';
import CartItem from './CartItem/CartItem';
import { Book } from '@/app/types';

const Cart = () => {
	const { cart } = useContext<TBookClubContext>(BookClubContext);
	console.log('cart', cart);
	return (
		<div className={styles.cartContainer}>
			{cart.length ? (
				<>
					<p className={styles.text}>Корзина:</p>
					<ul className={styles.list}>
						{cart.map((item: Book, index: number) => (
							<CartItem key={item.id} item={item} index={index}/>
						))}
					</ul>
					<Link href="/cart" className={styles.buttonCart}>
						Перейти в корзину
					</Link>
				</>
			) : (
				<p className={styles.empty}>Корзина пуста 👀</p>
			)}
		</div>
	);
};

export default Cart;
