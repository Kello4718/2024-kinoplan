import React from 'react';
import BooksList from './BooksList/BooksList';
import BooksPanel from './BooksPanel/BooksPanel';

const Books = () => {
	return (
		<section>
			<BooksPanel />
			<BooksList />
		</section>
	);
};

export default Books;
