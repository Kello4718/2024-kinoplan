'use client';

import { Button } from '@/app/ui';
import { Book } from '@/app/types';

import { useBookClub } from '@/app/hooks';
import Image from 'next/image';

import styles from './BooksItem.module.css';

const BooksItem = ({ book }: { book: Book }) => {
	const { title, author, year, category, image, id } = book;
	const { cart, setCart } = useBookClub();
	const addInCart = () => {
		setCart((prevState) => [...prevState, { title, quantity: 1, id }]);
	};

	const removeFromCart = (id: string) => {
		const filteredCart = cart.filter((item) => item.id !== id);
		setCart(filteredCart);
	};

	const isInCart = cart.find((element) => element.id === id);
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
					<p className={styles.author}>
						<strong>Автор:</strong> {author}
					</p>
					<p className={styles.year}>
						<strong>Год издания:</strong> {year}
					</p>
					<p className={styles.category}>
						<strong>Жанр:</strong> {category}
					</p>
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
