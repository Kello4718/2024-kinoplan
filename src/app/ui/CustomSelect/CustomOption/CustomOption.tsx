import { FC } from "react";

import { LABELS_OF_BOOKS_FILTER } from "@/constants";
import { useBookClub } from "@/hooks";
import { Filter } from "@/types";

import { CheckOutlined } from "@ant-design/icons";

import styles from "./CustomOption.module.css";

type CustomOptionProps = {
	item: Filter[keyof Filter];
	entity: keyof Filter;
};

export const CustomOption: FC<CustomOptionProps> = ({ item, entity }) => {
	const { filter, setFilter } = useBookClub();

	const handleOptionOnChange = () => {
		if (LABELS_OF_BOOKS_FILTER[entity]) {
			setFilter((prevState) => {
				return {
					...prevState,
					[entity]: item,
				};
			});
		}
	};

	const isChecked = Object.values(filter).includes(item);
	return (
		<li className={styles.option} key={item} onClick={handleOptionOnChange}>
			<span>{item}</span>
			{isChecked && <CheckOutlined />}
		</li>
	);
};
