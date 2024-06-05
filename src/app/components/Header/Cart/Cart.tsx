'use client';

import Link from 'next/link';
import { useBookClub } from '@/app/hooks';
import CartList from '../../Cart/CartList/CartList';

import { Badge, Popover } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import styles from './Cart.module.css';

const Content = () => {
	const { cart } = useBookClub();
	const cost = cart.reduce(
		(acc, item) => Math.floor(acc + item.quantity * item.price),
		0
	);
	return (
		<div className={styles.cartContainer}>
			<p className={styles.text}>Корзина:</p>
			<CartList />
			<div className={styles.totalContainer}>
				<p className={styles.total}>
					<strong>Итого в корзине книг на сумму:</strong> {cost} RUB
				</p>
				<Link href="/cart">Перейти в корзину</Link>
			</div>
		</div>
	);
};

const Cart = () => {
	const { cart } = useBookClub();
	const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
	return (
		<>
			<Popover
				placement="bottomRight"
				trigger={'click'}
				content={<Content />}
			>
				<Badge count={quantity}>
					<ShoppingCartOutlined className={styles.cart} />
				</Badge>
			</Popover>
		</>
	);
};

export default Cart;
