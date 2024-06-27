import { KIND_OF_BOOKS_FILTER, KIND_OF_BOOKS_SORT } from "@/constants";
import { Book, Filter } from "@/types";

import { useBookClub } from "./useBookClub";

export const useBookSort = () => {
	const { setIsSortVisible, setSort, setBooks, sort } = useBookClub();

	const sortByCategory = (a: Book, b: Book) =>
		sort.category === KIND_OF_BOOKS_SORT.Asc ? b.category.localeCompare(a.category) : a.category.localeCompare(b.category);

	const sortByYear = (a: Book, b: Book) =>
		sort.year === KIND_OF_BOOKS_SORT.Asc ? Number(b.year) - Number(a.year) : Number(a.year) - Number(b.year);

	const sortByAuthor = (a: Book, b: Book) =>
		sort.author === KIND_OF_BOOKS_SORT.Asc ? b.author.localeCompare(a.author) : a.author.localeCompare(b.author);

	const sortByFilter = (filter: keyof Filter) => {
		setIsSortVisible((prevState) => !prevState);
		setSort((prevState) => {
			return {
				...prevState,
				[filter]: prevState[filter] === KIND_OF_BOOKS_SORT.Asc ? KIND_OF_BOOKS_SORT.Desc : KIND_OF_BOOKS_SORT.Asc,
			};
		});

		switch (filter) {
			case KIND_OF_BOOKS_FILTER.Category:
				setBooks((prevState) => [...prevState].sort(sortByCategory));
				break;
			case KIND_OF_BOOKS_FILTER.Year:
				setBooks((prevState) => [...prevState].sort(sortByYear));
				break;
			case KIND_OF_BOOKS_FILTER.Author:
				setBooks((prevState) => [...prevState].sort(sortByAuthor));
				break;
			default:
				break;
		}
	};

	return { sortByFilter };
};
