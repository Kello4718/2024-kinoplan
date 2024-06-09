import { CheckOutlined } from "@ant-design/icons";
import { FC } from "react";

import { SELECT_MAP } from "@/constants";
import { useBookClub } from "@/hooks";
import { Filter } from "@/types";

import styles from "./CustomOption.module.css";

type CustomOptionProps = {
	item: string;
	essence: keyof Filter;
};

export const CustomOption: FC<CustomOptionProps> = ({ item, essence }) => {
	const { filter, setFilter, setIsFilterVisible } = useBookClub();

	const handleOptionOnChange = () => {
		if (SELECT_MAP[essence]) {
			setFilter((prevState) => {
				return {
					...prevState,
					[essence]: item,
				};
			});
			setIsFilterVisible(false);
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
