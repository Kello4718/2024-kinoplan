"use client";

import Image from "next/image";

import ChangeQuantity from "@/components/ChangeQuantity/ChangeQuantity";
import { useBookClub } from "@/hooks";
import emptyImage from "@/public/images/empty.jpg";
import { Book } from "@/types";
import { Button } from "@/ui";
import { formatCost } from "@/utils";

import styles from "./BooksItem.module.css";

const BooksItem = ({ book }: { book: Book }) => {
	const { title, author, year, category, image, id, price } = book;
	const { cart, setCart, setBooks } = useBookClub();

	const formatCartPrice = formatCost.format(price);

	const resetBookQuantity = (bookElement: Book) => {
		if (bookElement.id === id) {
			return {
				...bookElement,
				quantity: 1,
			};
		}

		return bookElement;
	};

	const addInCart = () => {
		setCart((prevState) => [...prevState, { ...book, quantity: 1 }]);
		setBooks((prevState) => prevState.map((bookElement) => resetBookQuantity(bookElement)));
	};

	const removeFromCart = (id: string) => {
		setCart((prevState) => prevState.filter((bookElement) => bookElement.id !== id));
		setBooks((prevState) => prevState.map((bookElement) => resetBookQuantity(bookElement)));
	};

	const isInCart = cart.some((cartElement) => cartElement.id === id);
	return (
		<li className={styles.book}>
			<figure className={styles.figure}>
				<Image src={image ?? emptyImage} width={500} height={500} alt={title} className={styles.image} />
				<figcaption className={styles.figcaption}>
					<h2 title={title} className={styles.title}>
						{title}
					</h2>
					<p className={styles.author}>
						<strong>Автор:</strong> {author}
					</p>
					<p className={styles.year}>
						<strong>Год издания:</strong> {year}
					</p>
					<p className={styles.category}>
						<strong>Жанр:</strong> {category}
					</p>
					<p className={styles.price}>
						<strong>Стоимость книги:</strong> {formatCartPrice}
					</p>
				</figcaption>
				{isInCart ? (
					<div className={styles.activityContainer}>
						<Button className={styles.button} onClick={() => removeFromCart(id)}>
							Удалить из корзины
						</Button>
						<ChangeQuantity item={book} />
					</div>
				) : (
					<Button className={styles.button} onClick={addInCart}>
						Добавить в корзину
					</Button>
				)}
			</figure>
		</li>
	);
};

export default BooksItem;
