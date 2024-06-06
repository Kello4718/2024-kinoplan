'use client';

import { Result } from 'antd';

import BooksList from './components/Books/BooksList/BooksList';
import BooksPanel from './components/Books/BooksPanel/BooksPanel';
import { useBookClub } from './hooks';

import styles from './page.module.css';

const Main = () => {
	const { isLoading, isError, books } = useBookClub();
	return (
		<>
			{isError && (
				<Result
					status="error"
					title={
						<p className={styles.title}>
							Опаааааа, а данные то не пришли...
						</p>
					}
					subTitle={
						<p className={styles.subtitle}>
							Зайдите к нам через часик
						</p>
					}
					className={styles.result}
				/>
			)}
			{isLoading && (
				<Result
					status="info"
					title={<p className={styles.title}>Идет загрузка</p>}
					subTitle={
						<p className={styles.subtitle}>Ждем, ждем, ждем...</p>
					}
					className={styles.result}
				/>
			)}
			{!isLoading && books.length > 0 && (
				<>
					<h1>Здесь вы найдете любую книгу</h1>
					<BooksPanel />
					<BooksList />
				</>
			)}
		</>
	);
};

export default Main;
