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
import { Book, CartBook, Filter, Sorted, Status, View } from '../types';

type TBookClubContext = {
	status: Status;
	setStatus: Dispatch<SetStateAction<Status>>;
	view: View;
	setView: Dispatch<SetStateAction<View>>;
	cart: CartBook[];
	setCart: Dispatch<SetStateAction<CartBook[]>>;
	books: Book[];
	setBooks: Dispatch<SetStateAction<Book[]>>;
	filter: Filter;
	setFilter: Dispatch<SetStateAction<Filter>>;
	sorted: Sorted;
	setSorted: Dispatch<SetStateAction<Sorted>>;
	isFilterVisible: boolean;
	setIsFilterVisible: Dispatch<SetStateAction<boolean>>;
	isSortedVisible: boolean;
	setIsSortedVisible: Dispatch<SetStateAction<boolean>>;
};

const BookClubContext = createContext<TBookClubContext | undefined>(undefined);

const BookClubContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [status, setStatus] = useState<Status>({
		isError: false,
		isLoading: false,
		isSuccess: false,
	});
	const [view, setView] = useState<View>('table');
	const [cart, setCart] = useState<CartBook[]>([]);
	const [books, setBooks] = useState<Book[]>([]);
	const [filter, setFilter] = useState<Filter>({
		category: null,
		year: null,
		author: null,
	});
	const [sorted, setSorted] = useState<Sorted>({
		category: false,
		year: false,
		author: false,
	});
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [isSortedVisible, setIsSortedVisible] = useState(false);
	const value: TBookClubContext = {
		status,
		setStatus,
		view,
		setView,
		cart,
		setCart,
		books,
		setBooks,
		filter,
		setFilter,
		isFilterVisible,
		setIsFilterVisible,
		sorted,
		setSorted,
		isSortedVisible,
		setIsSortedVisible,
	};

	const changeStatus = (
		isLoading: boolean,
		isError: boolean,
		isSuccess: boolean
	) => {
		setStatus({
			isError,
			isLoading,
			isSuccess,
		});
	};

	useEffect(() => {
		const getBooks = async () => {
			try {
				changeStatus(true, false, false);
				const res = await fetch(API_URL, {
					method: 'GET',
					mode: 'cors',
				});
				if (!res.ok) {
					changeStatus(false, true, false);
					return;
				}

				const data = await res.json();
				if (Array.isArray(data.items)) {
					const transformedData = await transformDataFromBack(
						data.items
					);
					setBooks(transformedData);
					changeStatus(false, false, true);
				} else {
					changeStatus(false, true, false);
				}
			} catch (error) {
				changeStatus(false, true, false);
			}
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
