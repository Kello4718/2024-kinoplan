'use client';

import React, { useContext, useState } from 'react';

import { Button } from '@/app/ui';
import { Book } from '@/app/types';
import { BookClubContext } from '@/app/context/BookClub';

import styles from './BooksItem.module.css';

const BooksItem = ({ book }: { book: Book }) => {
	const { title, author, date, category, image, id } = book;
	const { cart, setCart } = useContext(BookClubContext);
	const addInCart = () => {
		setCart((prevState: Book[]) => [
			...prevState,
			{ title, quantity: 1, id },
		]);
	};

	const removeFromCart = (id: number) => {
		const filteredCart = cart.filter((item: Book) => item.id !== id);
		setCart(filteredCart);
	};

	const isInCart = cart.find((element: Book) => element.id === id);
	return (
		<li className={styles.book}>
			<figure className={styles.figure}>
				<img
					src={image}
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
