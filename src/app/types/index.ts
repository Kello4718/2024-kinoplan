type Book = {
	title: string;
	author: string;
	year: string;
	category: string;
	image: string;
	id: string;
};

type CartBook = Pick<Book, 'title' | 'id'> & {
	quantity: number;
};

type BookFromBack = {
	id: string;
	volumeInfo: {
		title: string;
		authors: string[];
		publishedDate: string;
		categories: string[];
		imageLinks: {
			thumbnail: string;
		};
	};
};

type Filter = {
	category: null | string;
	year: null | string;
	author: null | string;
};

type Sorted = Record<'category' | 'year' | 'author', boolean>;

type View = 'table' | 'line';

type Status = {
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
};

export type { Book, CartBook, BookFromBack, Filter, Sorted, View, Status };
