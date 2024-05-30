import React, { FC, useContext, useState } from 'react';

import styles from './CartItem.module.css';
import { BookClubContext } from '@/app/context/BookClub';
import { Book } from '@/app/types';

type CartItemProps = {
	item: Book;
	index: number;
};

const CartItem: FC<CartItemProps> = ({ item, index }) => {
	const [quantity, setQuantity] = useState(item.quantity);
	const { cart, setCart } = useContext(BookClubContext);

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
