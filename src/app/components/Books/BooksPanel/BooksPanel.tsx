'use client';

import React from 'react';
import BooksFilter from './BooksFilter/BooksFilter';

import styles from './BooksPanel.module.css';
import { Button } from '@/app/ui';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useBookClub } from '@/app/hooks';
import BooksSorted from './BooksSorted/BooksSorted';

const BooksPanel = () => {
	const { view, setView } = useBookClub();

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
