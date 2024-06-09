"use client";

import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from "react";

import { API_URL } from "@/constants";
import { Book, Filter, Sort, View } from "@/types";
import { transformDataFromBack } from "@/utils";

export type TBookClubContext = {
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	isError: boolean;
	setIsError: Dispatch<SetStateAction<boolean>>;
	view: View;
	setView: Dispatch<SetStateAction<View>>;
	cart: Book[];
	setCart: Dispatch<SetStateAction<Book[]>>;
	isCartOpen: boolean;
	setIsCartOpen: Dispatch<SetStateAction<boolean>>;
	books: Book[];
	setBooks: Dispatch<SetStateAction<Book[]>>;
	filter: Filter;
	setFilter: Dispatch<SetStateAction<Filter>>;
	sort: Sort;
	setSort: Dispatch<SetStateAction<Sort>>;
	isFilterVisible: boolean;
	setIsFilterVisible: Dispatch<SetStateAction<boolean>>;
	isSortVisible: boolean;
	setIsSortVisible: Dispatch<SetStateAction<boolean>>;
};

export const BookClubContext = createContext<TBookClubContext | undefined>({
	isLoading: false,
	setIsLoading: () => {},
	isError: false,
	setIsError: () => {},
	view: "table",
	setView: () => {},
	cart: [],
	setCart: () => {},
	isCartOpen: false,
	setIsCartOpen: () => {},
	books: [],
	setBooks: () => {},
	filter: {
		category: "",
		year: "",
		author: "",
	},
	setFilter: () => {},
	sort: {
		category: "desc",
		year: "desc",
		author: "desc",
	},
	setSort: () => {},
	isFilterVisible: false,
	setIsFilterVisible: () => {},
	isSortVisible: false,
	setIsSortVisible: () => {},
});

const localBooks = localStorage.getItem("books");
const localCart = localStorage.getItem("cart");

const BookClubContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [view, setView] = useState<View>("table");
	const [cart, setCart] = useState<Book[]>([]);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [books, setBooks] = useState<Book[]>([]);
	const [filter, setFilter] = useState<Filter>({
		category: null,
		year: null,
		author: null,
	});
	const [sort, setSort] = useState<Sort>({
		category: "desc",
		year: "desc",
		author: "desc",
	});
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [isSortVisible, setIsSortVisible] = useState(false);
	const value: TBookClubContext = {
		isLoading,
		setIsLoading,
		isError,
		setIsError,
		view,
		setView,
		cart,
		setCart,
		isCartOpen,
		setIsCartOpen,
		books,
		setBooks,
		filter,
		setFilter,
		isFilterVisible,
		setIsFilterVisible,
		sort,
		setSort,
		isSortVisible,
		setIsSortVisible,
	};

	const updateLocalStorage = useCallback(() => {
		const booksForLocalStorage = JSON.stringify(books);
		const cartForLocalStorage = JSON.stringify(cart);
		localStorage.setItem("books", booksForLocalStorage);
		localStorage.setItem("cart", cartForLocalStorage);
	}, [books, cart]);

	useEffect(() => {
		const getBooks = async () => {
			try {
				setIsLoading(true);
				const res = await fetch(API_URL, {
					method: "GET",
					mode: "cors",
				});
				if (!res.ok) {
					throw new Error(`Server status is ${res.status}`);
				}
				const data = await res.json();
				const transformedData = await transformDataFromBack(data.items);
				setBooks(transformedData);
			} catch (error) {
				setIsLoading(false);
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};

		if (localBooks && localCart) {
			setBooks(JSON.parse(localBooks));
			setCart(JSON.parse(localCart));
			return;
		}

		getBooks();
	}, []);

	useEffect(() => {
		window.addEventListener("beforeunload", updateLocalStorage);
		return () =>
			window.removeEventListener("beforeunload", updateLocalStorage);
	}, [updateLocalStorage]);

	return (
		<BookClubContext.Provider value={value}>
			{children}
		</BookClubContext.Provider>
	);
};

export default BookClubContextProvider;
