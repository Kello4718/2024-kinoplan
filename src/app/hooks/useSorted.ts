import { Book, Filter } from '@/types';

import { useBookClub } from './useBookClub';

export const useSorted = () => {
	const { setIsSortVisible, setSort, setBooks, sort } = useBookClub();

	const toSortByCategory = (a: Book, b: Book) =>
		sort.category === 'asc'
			? b.category.localeCompare(a.category)
			: a.category.localeCompare(b.category);

	const toSortByYear = (a: Book, b: Book) =>
		sort.year === 'asc'
			? Number(b.year) - Number(a.year)
			: Number(a.year) - Number(b.year);

	const toSortByAuthor = (a: Book, b: Book) =>
		sort.author === 'asc'
			? b.author.localeCompare(a.author)
			: a.author.localeCompare(b.author);

	const handleSort = (field: keyof Filter) => {
		setIsSortVisible((prevState) => !prevState);
		setSort((prevState) => {
			return {
				...prevState,
				[field]: prevState[field] === 'asc' ? 'desc' : 'asc',
			};
		});

		switch (field) {
			case 'category':
				setBooks((prevState) => [...prevState].sort(toSortByCategory));
				break;
			case 'year':
				setBooks((prevState) => [...prevState].sort(toSortByYear));
				break;
			case 'author':
				setBooks((prevState) => [...prevState].sort(toSortByAuthor));
				break;
			default:
				break;
		}
	};

	return { handleSort };
};
