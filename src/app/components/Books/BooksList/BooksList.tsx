'use client';

import BooksItem from '../BooksItem/BooksItem';

import styles from './BooksList.module.css';
import { Book } from '@/app/types';
import { useBookClub } from '@/app/hooks';

const BooksList = () => {
	const { books, filter, view } = useBookClub();

	const getBooks = () => {
		if (filter.author && filter.category && filter.year) {
			return books.filter(
				(book: Book) =>
					book.author === filter.author &&
					book.category === filter.category &&
					book.year === filter.year
			);
		}
		if (filter.author && filter.category) {
			return books.filter(
				(book: Book) =>
					book.author === filter.author &&
					book.category === filter.category
			);
		}
		if (filter.author && filter.year) {
			return books.filter(
				(book: Book) =>
					book.author === filter.author && book.year === filter.year
			);
		}
		if (filter.category && filter.year) {
			return books.filter(
				(book: Book) =>
					book.category === filter.category &&
					book.year === filter.year
			);
		}
		if (filter.author) {
			return books.filter((book: Book) => book.author === filter.author);
		}
		if (filter.category) {
			return books.filter(
				(book: Book) => book.category === filter.category
			);
		}
		if (filter.year) {
			return books.filter((book: Book) => book.year === filter.year);
		}

		return books;
		// TODO Надо как-то переделать, склишком много условий, но как...
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
