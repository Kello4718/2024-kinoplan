import { useBookClub } from '@/app/hooks';
import React from 'react';

import styles from './CartList.module.css';
import CartItem from './CartItem/CartItem';

const CartList = () => {
	const { cart } = useBookClub();
	return (
		<ul className={styles.list}>
			{cart.map((item, index) => (
				<CartItem key={item.id} item={item} index={index} />
			))}
		</ul>
	);
};

export default CartList;
