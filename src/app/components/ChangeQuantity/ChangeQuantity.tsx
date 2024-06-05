import styles from './ChangeQuantity.module.css';
import { useBookClub } from '@/app/hooks';
import { Book } from '@/app/types';

const ChangeQuantity = ({ item, index }: { item: Book; index: number }) => {
	const { cart, setCart, books, setBooks } = useBookClub();
	const { id, quantity } = item;
	const decrement = () => {
		if (quantity === 1) {
			const filteredCart = cart.filter((element) => element.id !== id);
			setCart(filteredCart);
			return;
		}

		const updatedBooks = books.with(index, {
			...item,
			quantity: quantity - 1,
		});

		const indexOfItem = cart.findIndex((element) => element.id === id);
		const updatedCart = cart.with(indexOfItem, {
			...item,
			quantity: quantity - 1,
		});
		setBooks(updatedBooks);
		setCart(updatedCart);
	};

	const increment = () => {
		const updatedBooks = books.with(index, {
			...item,
			quantity: quantity + 1,
		});

		const indexOfItem = cart.findIndex((element) => element.id === id);
		const updatedCart = cart.with(indexOfItem, {
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
