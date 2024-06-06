import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';

import { useBookClub } from '@/hooks';
import { Button } from '@/ui';

import BooksFilter from './BooksFilter/BooksFilter';
import BooksSorted from './BooksSorted/BooksSorted';

import styles from './BooksPanel.module.css';

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
