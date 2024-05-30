'use client';

import React, { useContext } from 'react';
import BooksItem from '../BooksItem/BooksItem';

import styles from './BooksList.module.css';
import { BookClubContext } from '@/app/context/BookClub';
import { Book } from '@/app/types';

const BooksList = () => {
	const { books } = useContext(BookClubContext);
	return (
		<ul className={styles.list}>
			{books?.map((book: Book) => (
				<BooksItem key={book.id} book={book} />
			))}
		</ul>
	);
};

export default BooksList;
