'use client';

import BooksItem from '../BooksItem/BooksItem';

import { Book } from '@/app/types';
import { useBookClub } from '@/app/hooks';

import styles from './BooksList.module.css';

const BooksList = () => {
	const { books, filter, view } = useBookClub();

	const getBooks = () => {
		return books.filter((book: Book) => {
			return Object.entries(filter).every(([key, value]) => {
				if (value && book[key as keyof Book] !== value) {
					return false;
				}
				return true;
			});
		});
	};

	return (
		<ul
			className={`${styles.list} ${
				view === 'line' ? styles.listViewLine : ''
			}`}
		>
			{getBooks()?.map((book: Book) => (
				<BooksItem key={book.title} book={book} />
			))}
		</ul>
	);
};

export default BooksList;
