import { BookFromBack } from "../types";

const transformDataFromBack = (data: BookFromBack[]) =>
	data.map((book: BookFromBack) => {
		console.log('data', data);
		const { volumeInfo, id } = book;
		const { title, authors, publishedDate, categories, imageLinks } =
			volumeInfo;
		return {
			title,
			author: authors[0],
			date: publishedDate,
			category: categories[0],
			image: imageLinks.thumbnail,
			id,
		};
	});

export { transformDataFromBack };
