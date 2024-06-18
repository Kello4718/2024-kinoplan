"use client";

import { Result } from "antd";
import { useCallback } from "react";

import BooksList from "./components/Books/BooksList/BooksList";
import BooksPanel from "./components/Books/BooksPanel/BooksPanel";
import Loader from "./components/Loader/Loader";
import { fetchBooks } from "./api";
import { useBookClub } from "./hooks";
import { Button } from "./ui";

import styles from "./page.module.css";

const MainPage = () => {
	const { isLoading, setIsLoading, isError, setIsError, books, setBooks } = useBookClub();
	const getBooks = useCallback(() => {
		fetchBooks({ setBooks, setIsError, setIsLoading });
	}, [setBooks, setIsError, setIsLoading]);

	return (
		<>
			{isError && (
				<Result
					status="error"
					title={<p className={styles.resultTitle}>Ошибка загрузки данных</p>}
					subTitle={
						<>
							<p className={styles.resultSubtitle}>Стоит попробовать загрузить данные еще раз. </p>
							<Button onClick={getBooks} className={styles.resultRetryDataButton}>
								Загрузить
							</Button>
						</>
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
