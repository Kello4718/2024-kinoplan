'use client';

import Link from 'next/link';
import { useBookClub } from '@/app/hooks';
import CartList from '../../Cart/CartList/CartList';

import styles from './Cart.module.css';

const Cart = () => {
	const { cart } = useBookClub();
	return (
		<div className={styles.cartContainer}>
			{cart.length ? (
				<>
					<p className={styles.text}>Корзина:</p>
					<CartList />
					<Link href="/cart">Перейти в корзину</Link>
				</>
			) : (
				<p className={styles.empty}>Корзина пуста 👀</p>
			)}
		</div>
	);
};

export default Cart;
