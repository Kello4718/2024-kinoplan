"use client";

import { Result } from "antd";

import BooksList from "./components/Books/BooksList/BooksList";
import BooksPanel from "./components/Books/BooksPanel/BooksPanel";
import Loader from "./components/Loader/Loader";
import { useBookClub } from "./hooks";

import styles from "./page.module.css";

const MainPage = () => {
	const { isLoading, isError, books } = useBookClub();
	return (
		<>
			{isError && (
				<Result
					status="error"
					title={
						<p className={styles.resultTitle}>
							Опаааааа, а данные то не пришли...
						</p>
					}
					subTitle={
						<p className={styles.resultSubtitle}>
							Зайдите к нам через часик
						</p>
					}
					className={styles.result}
				/>
			)}
			{isLoading && <Loader />}
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

export default MainPage;
