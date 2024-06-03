import { FC } from 'react';

import { CartBook } from '@/app/types';
import { useBookClub } from '@/app/hooks';

import styles from './CartItem.module.css';

type CartItemProps = {
	item: CartBook;
	index: number;
};

const CartItem: FC<CartItemProps> = ({ item, index }) => {
	const { cart, setCart } = useBookClub();
	const { id, quantity, title } = item;

	const decrement = () => {
		if (quantity === 1) {
			const filteredCart = cart.filter((element) => element.id !== id);
			setCart(filteredCart);
			return;
		}

		const updatedCart = cart.with(index, {
			...item,
			quantity: quantity - 1,
		});
		setCart(updatedCart);
	};

	const increment = () => {
		const updatedCart = cart.with(index, {
			...item,
			quantity: quantity + 1,
		});
		setCart(updatedCart);
	};

	return (
		<li className={styles.item} key={id}>
			<span className={styles.title}>{title}</span>
			<div className={styles.buttonContainer}>
				<button onClick={decrement} className={styles.button}>
					-
				</button>
				<span className={styles.quantity}>{quantity}</span>
				<button onClick={increment} className={styles.button}>
					+
				</button>
			</div>
		</li>
	);
};

export default CartItem;
