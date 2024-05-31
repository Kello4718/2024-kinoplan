'use client';

import styles from './Cart.module.css';
import Link from 'next/link';
import CartItem from './CartItem/CartItem';
import { CartBook } from '@/app/types';
import { useBookClub } from '@/app/hooks';

const Cart = () => {
	const { cart } = useBookClub();
	return (
		<div className={styles.cartContainer}>
			{cart.length ? (
				<>
					<p className={styles.text}>Корзина:</p>
					<ul className={styles.list}>
						{cart.map((item: CartBook, index: number) => (
							<CartItem key={item.id} item={item} index={index} />
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
