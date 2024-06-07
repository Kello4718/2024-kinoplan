'use client';

import Image from 'next/image';

import ChangeQuantity from '@/components/ChangeQuantity/ChangeQuantity';
import { useBookClub } from '@/hooks';
import { Book } from '@/types';
import { Button } from '@/ui';

import styles from './BooksItem.module.css';

const BooksItem = ({ book }: { book: Book }) => {
	const { title, author, year, category, image, id, price, currency } = book;
	const { cart, setCart, books, setBooks } = useBookClub();
	const addInCart = () => {
		setCart((prevState) => [...prevState, book]);
	};

	const removeFromCart = (id: string) => {
		const filteredCart = cart.filter((item) => item.id !== id);
		setCart(filteredCart);
		const indexOfItem = books.findIndex((element) => element.id === id);
		const updatedBooks = books.with(indexOfItem, {
			...book,
			quantity: 1,
		});
		setBooks(updatedBooks);
	};

	const isInCart = cart.find((element) => element.id === id);
	return (
		<li className={styles.book}>
			<figure className={styles.figure}>
				<Image
					src={image ?? ''}
					width={500}
					height={500}
					alt={title}
					className={styles.image}
				/>
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
						<strong>Стоимость книги:</strong> {price} {currency}
					</p>
				</figcaption>
				{Boolean(isInCart) && (
					<div className={styles.activityContainer}>
						<Button
							className={styles.button}
							onClick={() => removeFromCart(id)}
						>
							Удалить из корзины
						</Button>
						<ChangeQuantity item={book} />
					</div>
				)}
				{Boolean(!isInCart) && (
					<Button className={styles.button} onClick={addInCart}>
						Добавить в корзину
					</Button>
				)}
			</figure>
		</li>
	);
};

export default BooksItem;
