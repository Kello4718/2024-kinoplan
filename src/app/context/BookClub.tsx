"use client";

import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

import { fetchBooks } from "@/api";
import { Book, Filter, Sort, View } from "@/types";

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
	cartCost: number;
	setCartCost: Dispatch<SetStateAction<number>>;
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
	cartCost: 0,
	setCartCost: () => {},
});

const localeStorageCart = localStorage.getItem("cart");

const BookClubContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [view, setView] = useState<View>("table");
	const [cart, setCart] = useState<Book[]>([]);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartCost, setCartCost] = useState(0);
	const [books, setBooks] = useState<Book[]>([]);
	const [filter, setFilter] = useState<Filter>({
		category: "",
		year: "",
		author: "",
	});
	const [sort, setSort] = useState<Sort>({
		category: "desc",
		year: "desc",
		author: "desc",
	});
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [isSortVisible, setIsSortVisible] = useState(false);

	const value: TBookClubContext = useMemo(
		() => ({
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
			cartCost,
			setCartCost,
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
		}),
		[books, cart, cartCost, filter, isCartOpen, isError, isFilterVisible, isLoading, isSortVisible, sort, view],
	);

	const updateLocalStorage = useCallback(() => {
		const booksForLocalStorage = JSON.stringify(books);
		const cartForLocalStorage = JSON.stringify(cart);
		localStorage.setItem("books", booksForLocalStorage);
		localStorage.setItem("cart", cartForLocalStorage);
	}, [books, cart]);

	const getBooks = useCallback(() => {
		fetchBooks({ setBooks, setIsError, setIsLoading });
	}, []);

	useEffect(getBooks, [getBooks]);

	useEffect(() => {
		if (localeStorageCart) {
			setCart(JSON.parse(localeStorageCart));
		}
	}, []);

	useEffect(() => {
		window.addEventListener("beforeunload", updateLocalStorage);
		return () => window.removeEventListener("beforeunload", updateLocalStorage);
	}, [updateLocalStorage]);

	return <BookClubContext.Provider value={value}>{children}</BookClubContext.Provider>;
};

export default BookClubContextProvider;
