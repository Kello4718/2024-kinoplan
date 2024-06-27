"use client";

import { FC, useState } from "react";

import { LABELS_OF_BOOKS_FILTER } from "@/constants";
import { useBookClub } from "@/hooks";
import { Filter } from "@/types";
import { Button } from "@/ui";

import { CustomOption } from "./CustomOption/CustomOption";

import styles from "./CustomSelect.module.css";

type CustomSelectProps = {
	entity: keyof Filter;
	data: Filter[keyof Filter][];
};

export const CustomSelect: FC<CustomSelectProps> = ({ entity, data }) => {
	const [isListVisible, setIsListVisible] = useState(false);
	const { setFilter } = useBookClub();

	const handleSelectOnClick = () => {
		setIsListVisible((prevState) => !prevState);
	};

	const handleButtonResetOnClick = () => {
		setFilter((prevState) => ({ ...prevState, [entity]: null }));
	};

	return (
		<div className={styles.selectContainer}>
			<Button onClick={handleSelectOnClick} className={styles.select}>
				{LABELS_OF_BOOKS_FILTER[entity]}
			</Button>
			{isListVisible && (
				<>
					<ul className={styles.optionList}>
						{Array.from(data).map((item) => (
							<CustomOption key={item} item={item} entity={entity} />
						))}
					</ul>
					<Button className={styles.reset} onClick={handleButtonResetOnClick}>
						Сбросить
					</Button>
				</>
			)}
		</div>
	);
};
