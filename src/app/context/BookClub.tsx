'use client';

import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react';

import { transformDataFromBack } from '../utils';
import { API_URL } from '../constants';
import { Book } from '../types';

type TBookClubContext = {
	cart: any; // TODO Book[]
	setCart: any; // TODO Dispatch<SetStateAction<Book[]>>
	books: any; // TODO Book[]
};

const BookClubContext = createContext({
	cart: [],
	setCart: (cart: Book[]) => {},
	books: [],
});

const BookClubContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [books, setBooks] = useState([]);
	const value: TBookClubContext = {
		cart,
		setCart,
		books,
	};

	useEffect(() => {
		const getBooks = async () => {
			const res = await fetch(API_URL, {
				method: 'GET',
				mode: 'cors',
			});
			if (!res.ok) {
				throw new Error('Ой-ой. Что-то пошло не так...');
			}

			const data = await res.json();
			const transformedData = await transformDataFromBack(data.items);
			console.log('transformedData', transformedData);
			setBooks(transformedData);
		};

		getBooks();
	}, []);

	return (
		<BookClubContext.Provider value={value}>
			{children}
		</BookClubContext.Provider>
	);
};

export type { TBookClubContext };
export { BookClubContext };
export default BookClubContextProvider;
