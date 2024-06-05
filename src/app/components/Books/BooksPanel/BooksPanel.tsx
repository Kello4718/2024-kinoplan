import BooksFilter from './BooksFilter/BooksFilter';
import { Button } from '@/app/ui';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import BooksSorted from './BooksSorted/BooksSorted';
import { useBookClub } from '@/app/hooks';

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
