'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Button } from '@/app/ui';
import CustomSelect from '@/app/ui/CustomSelect/CustomSelect';
import styles from './BooksFilter.module.css';
import { useBookClub } from '@/app/hooks';

const BooksFilter = () => {
	const { isFilterVisible, setIsFilterVisible, books } = useBookClub();
	const selectContainer = useRef<HTMLDivElement>(null);
	const handleButtonOnChange = () => {
		setIsFilterVisible((prevState) => !prevState);
	};

	const genres = books.map((book) => book.category);
	const dates = books.map((book) => book.date);
	const authors = books.map((book) => book.author);

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
				Фильтры
			</Button>
			{isFilterVisible && (
				<div className={styles.selectContainer}>
					<CustomSelect label="По жанрам" data={genres} />
					<CustomSelect label="По году издания" data={dates} />
					<CustomSelect label="По автору" data={authors} />
				</div>
			)}
		</div>
	);
};

export default BooksFilter;
