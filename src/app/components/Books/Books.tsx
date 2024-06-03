'use client';

import React, { useState } from 'react';
import BooksList from './BooksList/BooksList';
import BooksPanel from './BooksPanel/BooksPanel';
import { View } from '@/app/types';

const Books = () => {
	const [view, setView] = useState<View>('table');
	
	return (
		<section>
			<BooksPanel view={view} setView={setView} />
			<BooksList view={view} />
		</section>
	);
};

export default Books;
