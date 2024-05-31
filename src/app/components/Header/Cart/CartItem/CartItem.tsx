import { FC, useState } from 'react';

import styles from './CartItem.module.css';
import { CartBook } from '@/app/types';
import { useBookClub } from '@/app/hooks';

type CartItemProps = {
	item: CartBook;
	index: number;
};

const CartItem: FC<CartItemProps> = ({ item, index }) => {
	const [quantity, setQuantity] = useState(item.quantity);
	const { cart, setCart } = useBookClub();

	const decrement = () => {
		if (quantity === 1) {
			const filteredCart = cart.filter(
				(element) => element.id !== item.id
			);
			setCart(filteredCart);
			return;
		}

		setQuantity((prevState) => prevState - 1);
		const updatedCart = cart.with(index, {
			...item,
			quantity: quantity - 1,
		});
		setCart(updatedCart);
	};

	const increment = () => {
		setQuantity((prevState) => prevState + 1);
		const updatedCart = cart.with(index, {
			...item,
			quantity: quantity + 1,
		});
		setCart(updatedCart);
	};

	return (
		<li className={styles.item} key={item.id}>
			<span className={styles.title}>{item.title}</span>
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
