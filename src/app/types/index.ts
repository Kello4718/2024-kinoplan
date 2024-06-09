type Book = {
	title: string;
	author: string;
	year: string;
	category: string;
	image: string;
	id: string;
	quantity: number;
	price: number;
	currency: string;
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
	saleInfo: {
		retailPrice: {
			amount: number;
			currencyCode: string;
		};
	};
};

type Filter = {
	category: null | string;
	year: null | string;
	author: null | string;
};

type Sort = Record<keyof Filter, "asc" | "desc">;

type View = "table" | "line";

export type { Book, BookFromBack, Filter, Sort, View };
