import React from 'react'

// import Image from 'next/image'

import styles from './BooksItem.module.css'

const BooksItem = async ({ book }: any) => {
	const { volumeInfo } = book
	const { title, authors, publishedDate, categories, imageLinks } = volumeInfo
	console.log('book222', book)
	return (
		<li className={styles.book}>
			<figure className={styles.figure}>
				<img
					src={imageLinks.thumbnail}
					width={500}
					height={500}
					alt="Picture of the author"
					className={styles.image}
				/>
				<figcaption className={styles.figcaption}>
					<h2 title={title} className={styles.title}>
						{title}
					</h2>
					<p className={styles.author}>Автор: {authors[0]}</p>
					<p className={styles.year}>Год издания: {publishedDate}</p>
					<p className={styles.genre}>Жанр: {categories[0]}</p>
				</figcaption>
			</figure>
			<button className={styles.button}>В корзину</button>
		</li>
	)
}

export default BooksItem
