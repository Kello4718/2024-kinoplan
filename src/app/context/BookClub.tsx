'use client';

import {
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from 'react';

import { transformDataFromBack } from '../utils';
import { API_URL } from '../constants';
import { Book, CartBook, Filter } from '../types';

type TBookClubContext = {
	cart: CartBook[];
	setCart: Dispatch<SetStateAction<CartBook[]>>;
	books: Book[];
	filter: Filter;
	setFilter: Dispatch<SetStateAction<Filter>>;
	isFilterVisible: boolean;
	setIsFilterVisible: Dispatch<SetStateAction<boolean>>;
};

const BookClubContext = createContext<TBookClubContext | undefined>(undefined);

const BookClubContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [cart, setCart] = useState<CartBook[]>([]);
	const [books, setBooks] = useState<Book[]>([]);
	const [filter, setFilter] = useState<Filter>({
		genre: null,
		year: null,
		author: null,
	});
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const value: TBookClubContext = {
		cart,
		setCart,
		books,
		filter,
		setFilter,
		isFilterVisible,
		setIsFilterVisible,
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
