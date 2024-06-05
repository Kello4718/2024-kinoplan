import { FC } from 'react';
import ChangeQuantity from '@/app/components/ChangeQuantity/ChangeQuantity';
import { Book } from '@/app/types';

import styles from './CartItem.module.css';

type CartItemProps = {
	item: Book;
	index: number;
};

const CartItem: FC<CartItemProps> = ({ item, index }) => {
	const { author, category, image, price, title, year, currency } = item;
	return (
		<li className={styles.item} key={item.title}>
			<img
				src={image ?? ''}
				width={500}
				height={500}
				alt={title}
				className={styles.image}
			/>
			<span className={styles.title}>{title}</span>
			<span className={styles.author}>{author}</span>
			<span className={styles.year}>{year}</span>
			<span className={styles.category}>{category}</span>
			<span className={styles.price}>{price} {currency}</span>
			<div className={styles.quantityContainer}>
				<ChangeQuantity item={item} index={index} />
			</div>
		</li>
	);
};

export default CartItem;
