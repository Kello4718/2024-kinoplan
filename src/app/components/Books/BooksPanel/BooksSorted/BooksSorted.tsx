'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Button } from '@/app/ui';
import { useBookClub } from '@/app/hooks';

import styles from './BooksSorted.module.css';
import {
	SortAscendingOutlined,
	SortDescendingOutlined,
} from '@ant-design/icons';
import { Book } from '@/app/types';

const BooksSorted = () => {
	const {
		isSortedVisible,
		setIsSortedVisible,
		sorted,
		setSorted,
		booksBeforeSort,
		setBooks,
	} = useBookClub();
	const selectContainer = useRef<HTMLDivElement>(null);

	const handleButtonOnChange = () => {
		setIsSortedVisible((prevState) => !prevState);
	};

	const handleSortedCategoriesButtonOnClick = () => {
		setIsSortedVisible((prevState) => !prevState);
		setSorted((prevState) => ({
			category: !prevState.category,
			year: false,
			author: false,
		}));
		setBooks((prevState) =>
			prevState.sort((a: Book, b: Book) =>
				a.category.localeCompare(b.category)
			)
		);
	};

	const handleSortedYearsButtonOnClick = () => {
		setIsSortedVisible((prevState) => !prevState);
		setSorted((prevState) => ({
			category: false,
			year: !prevState.year,
			author: false,
		}));
		setBooks((prevState) =>
			prevState.sort(
				(a: Book, b: Book) => Number(a.year) - Number(b.year)
			)
		);
	};

	const handleSortedAuthorsButtonOnClick = () => {
		setIsSortedVisible((prevState) => !prevState);
		setSorted((prevState) => ({
			category: false,
			year: false,
			author: !prevState.author,
		}));
		setBooks((prevState) =>
			prevState.sort((a: Book, b: Book) =>
				a.author.localeCompare(b.author)
			)
		);
	};

	const closeSorted = useCallback(
		(evt: MouseEvent) => {
			if (
				selectContainer.current &&
				!selectContainer.current.contains(evt.target as Node)
			) {
				setIsSortedVisible(false);
			}
		},
		[setIsSortedVisible]
	);

	useEffect(() => {
		document.addEventListener('click', closeSorted);
		return () => document.removeEventListener('click', closeSorted);
	}, [closeSorted]);

	return (
		<div ref={selectContainer} className={styles.filterContainer}>
			<Button className={styles.button} onClick={handleButtonOnChange}>
				Сортировка
			</Button>
			{isSortedVisible && (
				<div className={styles.buttonContainer}>
					<Button
						className={styles.sortedButton}
						onClick={handleSortedCategoriesButtonOnClick}
					>
						<span>По жанрам</span>
						{sorted.category ? (
							<SortDescendingOutlined />
						) : (
							<SortAscendingOutlined />
						)}
					</Button>
					<Button
						className={styles.sortedButton}
						onClick={handleSortedYearsButtonOnClick}
					>
						<span>По году издания</span>
						{sorted.year ? (
							<SortDescendingOutlined />
						) : (
							<SortAscendingOutlined />
						)}
					</Button>
					<Button
						className={styles.sortedButton}
						onClick={handleSortedAuthorsButtonOnClick}
					>
						<span>По авторам</span>
						{sorted.author ? (
							<SortDescendingOutlined />
						) : (
							<SortAscendingOutlined />
						)}
					</Button>
				</div>
			)}
		</div>
	);
};

export default BooksSorted;
