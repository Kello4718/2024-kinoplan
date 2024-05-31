import React from 'react';
import BooksFilter from './BooksFilter/BooksFilter';

import styles from './BooksPanel.module.css';

const BooksPanel = () => {
	return (
		<div className={styles.panel}>
			<BooksFilter />
		</div>
	);
};

export default BooksPanel;
