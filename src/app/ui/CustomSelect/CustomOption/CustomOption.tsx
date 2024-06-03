import { FC } from 'react';

import styles from './CustomOption.module.css';
import { CheckOutlined } from '@ant-design/icons';
import { useBookClub } from '@/app/hooks';

type CustomOptionProps = {
	item: string;
	label: string;
};

const CustomOption: FC<CustomOptionProps> = ({ item, label }) => {
	const { filter, setFilter, setIsFilterVisible } = useBookClub();
	const handleOptionOnChange = () => {
		if (label === 'По жанрам') {
			setFilter((prevState) => ({ ...prevState, category: item }));
			setIsFilterVisible(false);
		}
		if (label === 'По году издания') {
			setFilter((prevState) => ({ ...prevState, year: item }));
			setIsFilterVisible(false);
		}
		if (label === 'По автору') {
			setFilter((prevState) => ({ ...prevState, author: item }));
			setIsFilterVisible(false);
		}
		// TODO Сделать мапу
	};

	const isChecked =
		filter.category === item ||
		filter.author === item ||
		filter.year === item;
	return (
		<li className={styles.option} key={item} onClick={handleOptionOnChange}>
			<span>{item}</span>
			{isChecked && <CheckOutlined />}
		</li>
	);
};

export default CustomOption;
