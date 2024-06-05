'use client';

import { FC, useState } from 'react';

import CustomOption from './CustomOption/CustomOption';
import { Filter } from '@/app/types';
import { Button } from '../Button';
import { useBookClub } from '@/app/hooks';

import styles from './CustomSelect.module.css';
import { SELECT_KEY_MAP } from '@/app/constants';

type CustomSelectProps = {
	label: string;
	data: string[];
};

const CustomSelect: FC<CustomSelectProps> = ({ label, data }) => {
	const [isListVisible, setIsListVisible] = useState(false);
	const { setFilter } = useBookClub();

	const uniqueData = new Set([...data]);

	const handleSelectOnClick = () => {
		setIsListVisible((prevState) => !prevState);
	};

	const handleButtonResetOnClick = () => {
		if (SELECT_KEY_MAP[label]) {
			setFilter((prevState) => ({
				...prevState,
				[SELECT_KEY_MAP[label]]: null,
			}));
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
						{Array.from(uniqueData).map((item) => (
							<CustomOption
								key={item}
								item={item}
								label={label}
							/>
						))}
					</ul>
					<Button
						className={styles.reset}
						onClick={handleButtonResetOnClick}
					>
						Сбросить
					</Button>
				</>
			)}
		</div>
	);
};

export default CustomSelect;
