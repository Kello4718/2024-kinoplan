import { useBookClub } from '@/hooks';

import CartItem from './CartItem/CartItem';

import styles from './CartList.module.css';

const CartList = () => {
	const { cart } = useBookClub();
	return (
		<ul className={styles.list}>
			<li className={styles.item}>
				<span className={styles.itemTitle}>Обложка</span>
				<span className={styles.itemTitle}>Название книги</span>
				<span className={styles.itemTitle}>Автор</span>
				<span className={styles.itemTitle}>Год издания</span>
				<span className={styles.itemTitle}>Жанр</span>
				<span className={styles.itemTitle}>Стоимость книги</span>
				<span className={styles.itemTitle}>Количество</span>
			</li>
			{cart.map((item, index) => (
				<CartItem key={item.title} item={item} index={index} />
			))}
		</ul>
	);
};

export default CartList;
