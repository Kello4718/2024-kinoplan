import React from 'react'
import BooksItem from '../BooksItem/BooksItem'

import styles from './BooksList.module.css'

const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=all'

const getBooks = async () => {
	const res = await fetch(API_URL)
	if (!res.ok) {
		throw new Error('Ой-ой. Что-то пошло не так...')
	}
	console.log(res)

	return res.json()
}

const BooksList = async () => {
	const {items} = await getBooks()
	console.log(items)
	return (
		<ul className={styles.list}>
			{items?.map((book: any) => (
				<BooksItem key={book.id} book={book} />
			))}
		</ul>
	)
}

export default BooksList
