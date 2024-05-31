'use client';

import BooksItem from '../BooksItem/BooksItem';

import styles from './BooksList.module.css';
import { Book } from '@/app/types';
import { useBookClub } from '@/app/hooks';

const BooksList = () => {
	const { books } = useBookClub();
	return (
		<ul className={styles.list}>
			{books?.map((book: Book) => (
				<BooksItem key={book.title} book={book} />
			))}
		</ul>
	);
};

export default BooksList;
