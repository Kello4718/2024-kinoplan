"use client";

import { Tooltip } from "antd";
import { useCallback, useEffect, useRef } from "react";

import { KEYS_ON_KEYBOARD, KIND_OF_BOOKS_FILTER, KIND_OF_BOOKS_SORT } from "@/constants";
import { useBookClub, useBookSort } from "@/hooks";
import { Button } from "@/ui";

import { AlignRightOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";

import styles from "./BooksSorted.module.css";

const BooksSorted = () => {
	const { isSortVisible, setIsSortVisible, sort } = useBookClub();
	const selectContainer = useRef<HTMLDivElement>(null);

	const handleButtonOnChange = () => {
		setIsSortVisible((prevState) => !prevState);
	};

	const { sortByFilter } = useBookSort();

	const handleSortBooksByCategory = () => {
		sortByFilter(KIND_OF_BOOKS_FILTER.Category);
	};

	const handleSortBooksByYear = () => {
		sortByFilter(KIND_OF_BOOKS_FILTER.Year);
	};

	const handleSortBooksByAuthor = () => {
		sortByFilter(KIND_OF_BOOKS_FILTER.Author);
	};

	const closeSortByOverlay = useCallback(
		(evt: MouseEvent) => {
			if (selectContainer.current && !selectContainer.current.contains(evt.target as Node)) {
				setIsSortVisible(false);
			}
		},
		[setIsSortVisible],
	);

	const closeSortByEsc = useCallback(
		(evt: KeyboardEvent) => {
			if (evt.key === KEYS_ON_KEYBOARD.Escape) {
				setIsSortVisible(false);
			}
		},
		[setIsSortVisible],
	);

	useEffect(() => {
		document.addEventListener("click", closeSortByOverlay);
		return () => document.removeEventListener("click", closeSortByOverlay);
	}, [closeSortByOverlay]);

	useEffect(() => {
		document.addEventListener("keydown", closeSortByEsc);
		return () => document.removeEventListener("keydown", closeSortByEsc);
	}, [closeSortByEsc]);

	return (
		<div ref={selectContainer} className={styles.filterContainer}>
			<Tooltip placement="top" color="var(--white01)" title={<span className={styles.tooltipText}>Сортировка</span>}>
				<AlignRightOutlined className={styles.tooltip} onClick={handleButtonOnChange} />
			</Tooltip>
			{isSortVisible && (
				<div className={styles.buttonContainer}>
					<Button className={styles.sortedButton} onClick={handleSortBooksByCategory}>
						<span>По жанрам</span>
						{sort.category === KIND_OF_BOOKS_SORT.Asc ? <SortDescendingOutlined /> : <SortAscendingOutlined />}
					</Button>
					<Button className={styles.sortedButton} onClick={handleSortBooksByYear}>
						<span>По году издания</span>
						{sort.year === KIND_OF_BOOKS_SORT.Asc ? <SortDescendingOutlined /> : <SortAscendingOutlined />}
					</Button>
					<Button className={styles.sortedButton} onClick={handleSortBooksByAuthor}>
						<span>По авторам</span>
						{sort.author === KIND_OF_BOOKS_SORT.Asc ? <SortDescendingOutlined /> : <SortAscendingOutlined />}
					</Button>
				</div>
			)}
		</div>
	);
};

export default BooksSorted;
