import { Book, BookFromBack } from "@/types";

const localCart = localStorage.getItem("cart");

export const transformDataFromBack = (data: BookFromBack[]) =>
	data.map((book) => {
		const { volumeInfo, id, saleInfo } = book;
		const { title, authors, publishedDate, categories, imageLinks } = volumeInfo;

		const getPrice = () => {
			const foundedBook: Book = localCart && JSON.parse(localCart).find((bookElement: Book) => bookElement.id === id);

			const bookPrice = saleInfo?.retailPrice?.amount;
			if (foundedBook && bookPrice === foundedBook.price) {
				return foundedBook.price;
			}
			return bookPrice ?? 100;
		};

		const getQuantity = () => {
			const foundedBook: Book = localCart && JSON.parse(localCart).find((bookElement: Book) => bookElement.id === id);
			return foundedBook ? foundedBook.quantity : 1;
		};

		return {
			title,
			author: authors[0],
			year: publishedDate.slice(0, 4),
			category: categories[0],
			image: imageLinks.thumbnail,
			id,
			quantity: getQuantity(),
			price: getPrice(),
		};
	});
