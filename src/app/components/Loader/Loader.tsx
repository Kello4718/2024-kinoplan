import styles from "./Loader.module.css";

const Loader = () => (
	<div className={styles.loaderContainer}>
		<div className={styles.loader}>
			<span>W</span>
			<span>a</span>
			<span>i</span>
			<span>t</span>
			<span>i</span>
			<span>n</span>
			<span>g</span>
			<span>.</span>
			<span>.</span>
			<span>.</span>
		</div>
	</div>
);

export default Loader;
