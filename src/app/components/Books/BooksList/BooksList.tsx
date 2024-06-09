import { Result } from "antd";

import { useBookClub } from "@/hooks";
import { Book } from "@/types";

import BooksItem from "./BooksItem/BooksItem";

import styles from "./BooksList.module.css";

const BooksList = () => {
	const { books, filter, view } = useBookClub();

	const getBooks = () =>
		books.filter((book) =>
			Object.entries(filter).every(([key, value]) => {
				if (value && book[key as keyof Book] !== value) {
					return false;
				}
				return true;
			}),
		);

	const updatedBooks = getBooks();

	return (
		<>
			{updatedBooks.length ? (
				<ul
					className={`${styles.list} ${
						view === "line" ? styles.listViewLine : ""
					}`}
				>
					{updatedBooks?.map((book) => (
						<BooksItem key={book.title} book={book} />
					))}
				</ul>
			) : (
				<Result
					status="info"
					title={
						<p className={styles.title}>
							По выбранным фильтрам книг нет
						</p>
					}
					subTitle={
						<p className={styles.subtitle}>
							Попробуйте выбрать другие фильтры
						</p>
					}
					className={styles.result}
				/>
			)}
		</>
	);
};

export default BooksList;
