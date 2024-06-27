"use client";

import { Tooltip } from "antd";
import { useCallback, useEffect, useRef } from "react";

import { KEYS_ON_KEYBOARD } from "@/constants";
import { useBookClub } from "@/hooks";
import { Book, Filter } from "@/types";
import { Button, CustomSelect } from "@/ui";

import { FilterOutlined } from "@ant-design/icons";

import styles from "./BooksFilter.module.css";

type FilterData = {
	category: Set<string>;
	author: Set<string>;
	year: Set<string>;
};

const BooksFilter = () => {
	const { isFilterVisible, setIsFilterVisible, books, setFilter } = useBookClub();

	const selectContainer = useRef<HTMLDivElement>(null);
	const handleButtonOnChange = () => {
		setIsFilterVisible((prevState) => !prevState);
	};

	const filterData = books.reduce(
		(acc, bookElement: Book) => {
			acc.category.add(bookElement.category);
			acc.author.add(bookElement.author);
			acc.year.add(bookElement.year);

			return acc;
		},
		{
			category: new Set(),
			author: new Set(),
			year: new Set(),
		} as FilterData,
	);

	const handleButtonResetOnClick = () => {
		setFilter({
			author: "",
			category: "",
			year: "",
		});
	};

	const closeFilterByOverlay = useCallback(
		(evt: MouseEvent) => {
			if (selectContainer.current && !selectContainer.current.contains(evt.target as Node)) {
				setIsFilterVisible(false);
			}
		},
		[setIsFilterVisible],
	);

	const closeFilterByEsc = useCallback(
		(evt: KeyboardEvent) => {
			if (evt.key === KEYS_ON_KEYBOARD.Escape) {
				setIsFilterVisible(false);
			}
		},
		[setIsFilterVisible],
	);

	useEffect(() => {
		document.addEventListener("click", closeFilterByOverlay);
		return () => document.removeEventListener("click", closeFilterByOverlay);
	}, [closeFilterByOverlay]);

	useEffect(() => {
		document.addEventListener("keydown", closeFilterByEsc);
		return () => document.removeEventListener("keydown", closeFilterByEsc);
	}, [closeFilterByEsc]);

	return (
		<div ref={selectContainer} className={styles.filterContainer}>
			<Tooltip placement="topLeft" color="var(--white01)" title={<span className={styles.tooltipText}>Фильтрация</span>}>
				<FilterOutlined className={styles.tooltip} onClick={handleButtonOnChange} />
			</Tooltip>
			{isFilterVisible && (
				<div className={styles.selectContainer}>
					{Object.keys(filterData).map((key) => (
						<CustomSelect key={key} entity={key as keyof Filter} data={Array.from(filterData[key as keyof Filter])} />
					))}
					<Button className={styles.reset} onClick={handleButtonResetOnClick}>
						Сбросить все фильтры
					</Button>
				</div>
			)}
		</div>
	);
};

export default BooksFilter;
