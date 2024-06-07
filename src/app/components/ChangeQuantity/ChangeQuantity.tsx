import { useBookClub } from '@/hooks';
import { Book } from '@/types';

import styles from './ChangeQuantity.module.css';

const ChangeQuantity = ({ item }: { item: Book }) => {
	const { cart, setCart, books, setBooks } = useBookClub();
	const { id, quantity } = item;
	const indexOfItemBook = books.findIndex((element) => element.id === id);
	const indexOfItemCart = cart.findIndex((element) => element.id === id);
	const decrement = () => {
		if (quantity === 1) {
			const filteredCart = cart.filter((element) => element.id !== id);
			setCart(filteredCart);
			return;
		}

		const updatedBooks = books.with(indexOfItemBook, {
			...item,
			quantity: quantity - 1,
		});

		const updatedCart = cart.with(indexOfItemCart, {
			...item,
			quantity: quantity - 1,
		});
		setBooks(updatedBooks);
		setCart(updatedCart);
	};

	const increment = () => {
		const updatedBooks = books.with(indexOfItemBook, {
			...item,
			quantity: quantity + 1,
		});

		const updatedCart = cart.with(indexOfItemCart, {
			...item,
			quantity: quantity + 1,
		});
		setBooks(updatedBooks);
		setCart(updatedCart);
	};

	return (
		<div className={styles.buttonContainer}>
			<button onClick={decrement} className={styles.button}>
				-
			</button>
			<span className={styles.quantity}>{quantity} шт.</span>
			<button onClick={increment} className={styles.button}>
				+
			</button>
		</div>
	);
};

export default ChangeQuantity;
