'use client';

import BooksPanel from './components/Books/BooksPanel/BooksPanel';
import BooksList from './components/Books/BooksList/BooksList';
import { useBookClub } from './hooks';
import { Result } from 'antd';

import styles from './page.module.css';

const Main = () => {
	const { status } = useBookClub();
	return (
		<>
			{status.isError && (
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
			{status.isLoading && (
				<Result
					status="info"
					title={<p className={styles.title}>Идет загрузка</p>}
					subTitle={
						<p className={styles.subtitle}>Ждем, ждем, ждем...</p>
					}
					className={styles.result}
				/>
			)}
			{status.isSuccess && (
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
