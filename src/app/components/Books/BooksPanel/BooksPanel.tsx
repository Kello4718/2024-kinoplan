'use client';

import React, { FC } from 'react';
import BooksFilter from './BooksFilter/BooksFilter';

import { Button } from '@/app/ui';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import BooksSorted from './BooksSorted/BooksSorted';
import { View } from '@/app/types';

import styles from './BooksPanel.module.css';

type BooksPanelProps = {
	view: View;
	setView: React.Dispatch<React.SetStateAction<View>>;
};

const BooksPanel: FC<BooksPanelProps> = ({ view, setView }) => {
	const handleViewButtonOnClick = () => {
		if (view === 'table') {
			setView('line');
		} else {
			setView('table');
		}
	};

	return (
		<div className={styles.panel}>
			<BooksFilter />
			<BooksSorted />
			<Button
				className={styles.viewButton}
				onClick={handleViewButtonOnClick}
			>
				{view === 'line' ? (
					<TableOutlined />
				) : (
					<UnorderedListOutlined />
				)}
			</Button>
		</div>
	);
};

export default BooksPanel;
