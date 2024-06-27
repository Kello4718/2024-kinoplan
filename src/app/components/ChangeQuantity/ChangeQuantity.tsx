import { useBookClub } from "@/hooks";
import { Book } from "@/types";

import styles from "./ChangeQuantity.module.css";

const ChangeQuantity = ({ item }: { item: Book }) => {
	const { setCart, setBooks } = useBookClub();

	const { id, quantity } = item;

	const decrementQuantity = (bookElement: Book) => {
		if (bookElement.id === id) {
			return {
				...item,
				quantity: quantity - 1,
			};
		}

		return bookElement;
	};

	const incrementQuantity = (bookElement: Book) => {
		if (bookElement.id === id) {
			return {
				...item,
				quantity: quantity + 1,
			};
		}

		return bookElement;
	};

	const decrement = () => {
		if (quantity === 1) {
			setCart((prevState) => prevState.filter((bookElement) => bookElement.id !== id));
			return;
		}

		setBooks((prevState) => prevState.map((bookElement) => decrementQuantity(bookElement)));
		setCart((prevState) => prevState.map((bookElement) => decrementQuantity(bookElement)));
	};

	const increment = () => {
		setBooks((prevState) => prevState.map((bookElement) => incrementQuantity(bookElement)));
		setCart((prevState) => prevState.map((bookElement) => incrementQuantity(bookElement)));
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
