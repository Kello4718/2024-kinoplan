"use client";

import { FilterOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useCallback, useEffect, useRef } from "react";

import { useBookClub } from "@/hooks";
import { Button, CustomSelect } from "@/ui";

import styles from "./BooksFilter.module.css";

const BooksFilter = () => {
	const { isFilterVisible, setIsFilterVisible, books, setFilter } =
		useBookClub();
	const selectContainer = useRef<HTMLDivElement>(null);
	const handleButtonOnChange = () => {
		setIsFilterVisible((prevState) => !prevState);
	};

	const categories = books.map((book) => book.category);
	const sortedCategories = [...categories].sort();

	const years = books.map((book) => book.year);
	const sortedYears = [...years].sort((a, b) => Number(a) - Number(b));

	const authors = books.map((book) => book.author);
	const sortedAuthors = [...authors].sort();

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
		[setIsFilterVisible],
	);

	useEffect(() => {
		document.addEventListener("click", closeFilter);
		return () => document.removeEventListener("click", closeFilter);
	}, [closeFilter]);

	return (
		<div ref={selectContainer} className={styles.filterContainer}>
			<Tooltip
				placement="topLeft"
				color="#66FCF1"
				title={<span className={styles.tooltipText}>Фильтрация</span>}
			>
				<FilterOutlined
					className={styles.tooltip}
					onClick={handleButtonOnChange}
				/>
			</Tooltip>
			{isFilterVisible && (
				<div className={styles.selectContainer}>
					<CustomSelect essence="category" data={sortedCategories} />
					<CustomSelect essence="year" data={sortedYears} />
					<CustomSelect essence="author" data={sortedAuthors} />
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
