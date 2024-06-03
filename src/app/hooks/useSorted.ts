import { Book } from '../types';
import { useBookClub } from './useBookClub';

const useSorted = () => {
	const { setIsSortedVisible, setSorted, setBooks, sorted } = useBookClub();

	const handleSort = (field: string) => {
		setIsSortedVisible((prevState) => !prevState);
		setSorted((prevState) => ({
			category: field === 'category' ? !prevState.category : false,
			year: field === 'year' ? !prevState.year : false,
			author: field === 'author' ? !prevState.author : false,
		}));

		switch (field) {
			case 'category':
				setBooks((prevState) =>
					prevState.sort((a: Book, b: Book) =>
						sorted.category
							? b.category.localeCompare(a.category)
							: a.category.localeCompare(b.category)
					)
				);
				break;
			case 'year':
				setBooks((prevState) =>
					prevState.sort((a: Book, b: Book) =>
						sorted.year
							? Number(b.year) - Number(a.year)
							: Number(a.year) - Number(b.year)
					)
				);
				break;
			case 'author':
				setBooks((prevState) =>
					prevState.sort((a: Book, b: Book) =>
						sorted.author
							? b.author.localeCompare(a.author)
							: a.author.localeCompare(b.author)
					)
				);
				break;
			default:
				break;
		}
	};

	return { handleSort };
};

export { useSorted };
