'use client';

import { useState } from 'react';
import { View } from './types';
import BooksPanel from './components/Books/BooksPanel/BooksPanel';
import BooksList from './components/Books/BooksList/BooksList';

const Main = () => {
	const [view, setView] = useState<View>('table');
	return (
		<>
			<h1>Здесь вы найдете любую книгу</h1>
			<BooksPanel view={view} setView={setView} />
			<BooksList view={view} />
		</>
	);
};

export default Main;
