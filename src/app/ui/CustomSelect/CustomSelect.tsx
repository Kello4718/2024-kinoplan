'use client';

import { FC, useState } from 'react';

import { SELECT_MAP } from '@/constants';
import { useBookClub } from '@/hooks';
import { Filter } from '@/types';
import { Button } from '@/ui';

import { CustomOption } from './CustomOption/CustomOption';

import styles from './CustomSelect.module.css';

type CustomSelectProps = {
	essence: keyof Filter;
	data: string[];
};

export const CustomSelect: FC<CustomSelectProps> = ({ essence, data }) => {
	const [isListVisible, setIsListVisible] = useState(false);
	const { setFilter } = useBookClub();
	const uniqueData = new Set(data);

	const handleSelectOnClick = () => {
		setIsListVisible((prevState) => !prevState);
	};

	const handleButtonResetOnClick = () => {
		if (essence) {
			setFilter((prevState) => {
				return {
					...prevState,
					[essence]: null,
				};
			});
		}
	};

	return (
		<div className={styles.selectContainer}>
			<Button onClick={handleSelectOnClick} className={styles.select}>
				{SELECT_MAP[essence]}
			</Button>
			{isListVisible && (
				<>
					<ul className={styles.optionList}>
						{Array.from(uniqueData).map((item) => (
							<CustomOption
								key={item}
								item={item}
								essence={essence}
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
