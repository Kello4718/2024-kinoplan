'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Button } from '@/app/ui';
import { useBookClub, useSorted } from '@/app/hooks';

import {
	AlignRightOutlined,
	SortAscendingOutlined,
	SortDescendingOutlined,
} from '@ant-design/icons';

import styles from './BooksSorted.module.css';

const BooksSorted = () => {
	const { isSortedVisible, setIsSortedVisible, sorted } = useBookClub();
	const selectContainer = useRef<HTMLDivElement>(null);

	const handleButtonOnChange = () => {
		setIsSortedVisible((prevState) => !prevState);
	};

	const { handleSort } = useSorted();

	const handleSortedCategoriesButtonOnClick = () => {
		handleSort('category');
	};

	const handleSortedYearsButtonOnClick = () => {
		handleSort('year');
	};

	const handleSortedAuthorsButtonOnClick = () => {
		handleSort('author');
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
				<AlignRightOutlined />
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
