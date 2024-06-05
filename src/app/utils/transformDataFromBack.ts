import { BookFromBack } from '../types';

const transformDataFromBack = (data: BookFromBack[]) =>
	data.map((book) => {
		const { volumeInfo, id, saleInfo } = book;
		const { title, authors, publishedDate, categories, imageLinks } =
			volumeInfo;
		const price = saleInfo?.retailPrice?.amount ?? 100;
		const currency = saleInfo?.retailPrice?.currencyCode ?? 'RUB';
		return {
			title,
			author: authors[0],
			year: publishedDate.slice(0, 4),
			category: categories[0],
			image: imageLinks.thumbnail,
			id,
			quantity: 1,
			price,
			currency,
		};
	});

export { transformDataFromBack };
