import { FC, useState } from 'react';

import styles from './CustomSelect.module.css';
import CustomOption from './CustomOption/CustomOption';
import { Filter } from '@/app/types';
import { Button } from '../Button';
import { useBookClub } from '@/app/hooks';

type CustomSelectProps = {
	label: string;
	data: string[];
};

const CustomSelect: FC<CustomSelectProps> = ({ label, data }) => {
	const [isListVisible, setIsListVisible] = useState(false);
	const { setFilter } = useBookClub();

	const handleSelectOnClick = () => {
		setIsListVisible((prevState) => !prevState);
	};

	const handleOnReset = () => {
		if (label === 'По жанрам') {
			setFilter((prevState: Filter) => ({ ...prevState, genre: null }));
		}
		if (label === 'По году издания') {
			setFilter((prevState: Filter) => ({ ...prevState, year: null }));
		}
		if (label === 'По автору') {
			setFilter((prevState: Filter) => ({ ...prevState, author: null }));
		}
	};
	return (
		<div className={styles.selectContainer}>
			<Button onClick={handleSelectOnClick} className={styles.select}>
				{label}
			</Button>
			{isListVisible && (
				<>
					<ul className={styles.optionList}>
						{data.map((item) => (
							<CustomOption
								key={item}
								item={item}
								label={label}
							/>
						))}
					</ul>
					<Button className={styles.reset} onClick={handleOnReset}>
						Сбросить
					</Button>
				</>
			)}
		</div>
	);
};

export default CustomSelect;
