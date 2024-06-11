export type Book = {
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

export type BookFromBack = {
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

export type Filter = {
	category: null | string;
	year: null | string;
	author: null | string;
};

export type Sort = Record<keyof Filter, "asc" | "desc">;

export type User = Record<"email" | "password", string>;

export type View = "table" | "line";
