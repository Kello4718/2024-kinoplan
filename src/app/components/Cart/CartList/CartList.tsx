import { useBookClub } from "@/hooks";

import CartItem from "./CartItem/CartItem";

import styles from "./CartList.module.css";

const CartList = () => {
	const { cart } = useBookClub();
	return (
		<ul className={styles.list}>
			<li className={styles.item}>
				<span className={styles.itemTitleImage}>Обложка</span>
				<span className={styles.itemTitleTitle}>Название книги</span>
				<span className={styles.itemTitleAuthor}>Автор</span>
				<span className={styles.itemTitleYear}>Год издания</span>
				<span className={styles.itemTitleCategory}>Жанр</span>
				<span className={styles.itemTitleCost}>Стоимость книги</span>
				<span className={styles.itemTitleQuantity}>Количество</span>
			</li>
			{cart.map((bookElement) => (
				<CartItem key={bookElement.title} item={bookElement} />
			))}
		</ul>
	);
};

export default CartList;
