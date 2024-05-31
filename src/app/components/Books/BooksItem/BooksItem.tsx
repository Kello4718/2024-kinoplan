'use client';

import { Button } from '@/app/ui';
import { Book, CartBook } from '@/app/types';

import styles from './BooksItem.module.css';
import { useBookClub } from '@/app/hooks';
import Image from 'next/image';

const BooksItem = ({ book }: { book: Book }) => {
	const { title, author, date, category, image, id } = book;
	const { cart, setCart } = useBookClub();
	const addInCart = () => {
		setCart((prevState) => [...prevState, { title, quantity: 1, id }]);
	};

	const removeFromCart = (id: string) => {
		const filteredCart = cart.filter((item: CartBook) => item.id !== id);
		setCart(filteredCart);
	};

	const isInCart = cart.find((element: CartBook) => element.id === id);
	return (
		<li className={styles.book}>
			<figure className={styles.figure}>
				<Image
					src={image ?? ''}
					width={500}
					height={500}
					alt="Picture of the author"
					className={styles.image}
				/>
				<figcaption className={styles.figcaption}>
					<h2 title={title} className={styles.title}>
						{title}
					</h2>
					<p className={styles.author}>Автор: {author}</p>
					<p className={styles.year}>Год издания: {date}</p>
					<p className={styles.genre}>Жанр: {category}</p>
				</figcaption>
				{Boolean(isInCart) && (
					<Button
						className={styles.button}
						onClick={() => removeFromCart(id)}
					>
						Удалить из корзины
					</Button>
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
