'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Button } from '@/app/ui';
import CustomSelect from '@/app/ui/CustomSelect/CustomSelect';
import { useBookClub } from '@/app/hooks';

import styles from './BooksFilter.module.css';
import { FilterOutlined } from '@ant-design/icons';

const BooksFilter = () => {
	const { isFilterVisible, setIsFilterVisible, books, setFilter } =
		useBookClub();
	const selectContainer = useRef<HTMLDivElement>(null);
	const handleButtonOnChange = () => {
		setIsFilterVisible((prevState) => !prevState);
	};

	const categories = books.map((book) => book.category);
	const sortedCategories = categories.sort();

	const years = books.map((book) => book.year);
	const sortedYears = years.sort((a, b) => Number(a) - Number(b));

	const authors = books.map((book) => book.author);
	const sortedAuthors = authors.sort();

	const handleButtonResetOnClick = () => {
		setFilter({
			author: null,
			category: null,
			year: null,
		});
		setIsFilterVisible(false);
	};

	const closeFilter = useCallback(
		(evt: MouseEvent) => {
			if (
				selectContainer.current &&
				!selectContainer.current.contains(evt.target as Node)
			) {
				setIsFilterVisible(false);
			}
		},
		[setIsFilterVisible]
	);

	useEffect(() => {
		document.addEventListener('click', closeFilter);
		return () => document.removeEventListener('click', closeFilter);
	}, [closeFilter]);

	return (
		<div ref={selectContainer} className={styles.filterContainer}>
			<Button className={styles.button} onClick={handleButtonOnChange}>
				<FilterOutlined />
			</Button>
			{isFilterVisible && (
				<div className={styles.selectContainer}>
					<CustomSelect label="По жанрам" data={sortedCategories} />
					<CustomSelect label="По году издания" data={sortedYears} />
					<CustomSelect label="По автору" data={sortedAuthors} />
					<Button
						className={styles.reset}
						onClick={handleButtonResetOnClick}
					>
						Сбросить все фильтры
					</Button>
				</div>
			)}
		</div>
	);
};

export default BooksFilter;
