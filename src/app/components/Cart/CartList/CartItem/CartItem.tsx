import Image from "next/image";

import ChangeQuantity from "@/components/ChangeQuantity/ChangeQuantity";
import emptyImage from "@/public/images/empty.jpg";
import { Book } from "@/types";
import { formatCost } from "@/utils";

import styles from "./CartItem.module.css";

const CartItem = ({ item }: { item: Book }) => {
	const { author, category, image, price, title, year } = item;
	const formatCartPrice = formatCost.format(price);
	return (
		<li className={styles.item} key={item.title}>
			<Image src={image ?? emptyImage} width={500} height={500} alt={title} className={styles.image} />
			<div className={styles.infoContainer}>
				<span className={styles.title}>{title}</span>
				<span className={styles.author}>{author}</span>
				<span className={styles.year}>{year}</span>
				<span className={styles.category}>{category}</span>
				<span className={styles.price}>{formatCartPrice}</span>
				<div className={styles.quantityContainer}>
					<ChangeQuantity item={item} />
				</div>
			</div>
		</li>
	);
};

export default CartItem;
