import styles from "./Loader.module.css";

const Loader = () => (
	<div className={styles.bookContainer}>
		<div className={styles.book}>
			<div className={styles.bookPgShadow}></div>
			<div className={styles.bookPg}></div>
			<div className={`${styles.bookPg} ${styles.bookPg2}`}></div>
			<div className={`${styles.bookPg} ${styles.bookPg3}`}></div>
			<div className={`${styles.bookPg} ${styles.bookPg4}`}></div>
			<div className={`${styles.bookPg} ${styles.bookPg5}`}></div>
		</div>
	</div>
);

export default Loader;
