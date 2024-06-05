'use client';

import Link from 'next/link';
import { useBookClub } from '@/app/hooks';
import CartList from '../../Cart/CartList/CartList';

import { Badge, Popover } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { CartBook } from '@/app/types';

import styles from './Cart.module.css';

const Content = () => {
	const { cart } = useBookClub();
	return (
		<div className={styles.cartContainer}>
			{cart.length ? (
				<>
					<p className={styles.text}>Корзина:</p>
					<CartList />
					<Link href="/cart">Перейти в корзину</Link>
				</>
			) : (
				<p className={styles.empty}>Корзина пуста 👀</p>
			)}
		</div>
	);
};

const Cart = () => {
	const { cart } = useBookClub();
	const quantity = cart.reduce(
		(acc, item) => acc + item.quantity,
		0
	);
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
