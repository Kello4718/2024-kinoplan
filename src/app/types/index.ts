type Book = {
	title: string;
	author?: string;
	date?: string;
	category?: string;
	image?: string;
	quantity: number;
	id: number;
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

export type { Book, BookFromBack };
