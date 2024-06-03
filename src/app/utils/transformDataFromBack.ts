import { BookFromBack } from '../types';

const transformDataFromBack = (data: BookFromBack[]) =>
	data.map((book: BookFromBack) => {
		const { volumeInfo, id } = book;
		const { title, authors, publishedDate, categories, imageLinks } =
			volumeInfo;
		return {
			title,
			author: authors[0],
			year: publishedDate.slice(0, 4),
			category: categories[0],
			image: imageLinks.thumbnail,
			id,
		};
	});

export { transformDataFromBack };
