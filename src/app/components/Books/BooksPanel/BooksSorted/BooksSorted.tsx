'use client';

import {
	AlignRightOutlined,
	SortAscendingOutlined,
	SortDescendingOutlined,
} from '@ant-design/icons';
import { useCallback, useEffect, useRef } from 'react';

import { useBookClub, useSorted } from '@/hooks';
import { Button } from '@/ui';

import styles from './BooksSorted.module.css';

const BooksSorted = () => {
	const { isSortVisible, setIsSortVisible, sort } = useBookClub();
	const selectContainer = useRef<HTMLDivElement>(null);

	const handleButtonOnChange = () => {
		setIsSortVisible((prevState) => !prevState);
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
				setIsSortVisible(false);
			}
		},
		[setIsSortVisible]
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
			{isSortVisible && (
				<div className={styles.buttonContainer}>
					<Button
						className={styles.sortedButton}
						onClick={handleSortedCategoriesButtonOnClick}
					>
						<span>По жанрам</span>
						{sort.category === 'asc' ? (
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
						{sort.year === 'asc' ? (
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
						{sort.author === 'asc' ? (
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
