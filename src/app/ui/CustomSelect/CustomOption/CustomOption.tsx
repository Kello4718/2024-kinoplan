import { FC } from 'react';

import { CheckOutlined } from '@ant-design/icons';
import { useBookClub } from '@/app/hooks';

import styles from './CustomOption.module.css';
import { Filter } from '@/app/types';
import { SELECT_KEY_MAP } from '@/app/constants';

type CustomOptionProps = {
	item: string;
	label: string;
};

const CustomOption: FC<CustomOptionProps> = ({ item, label }) => {
	const { filter, setFilter, setIsFilterVisible } = useBookClub();

	const handleOptionOnChange = () => {
		if (SELECT_KEY_MAP[label]) {
			setFilter((prevState) => ({
				...prevState,
				[SELECT_KEY_MAP[label]]: item,
			}));
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

export default CustomOption;
