type Book = {
	title: string;
	author: string;
	date: string;
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
	genre: null | string;
	year: null | string;
	author: null | string;
};

export type { Book, CartBook, BookFromBack, Filter };
