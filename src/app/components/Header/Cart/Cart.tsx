'use client';

import Link from 'next/link';
import { useBookClub } from '@/app/hooks';
import CartList from '../../Cart/CartList/CartList';

import styles from './Cart.module.css';
import { Badge, Popover } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

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
	return (
		<>
			<Popover
				placement="bottomRight"
				trigger={'click'}
				content={<Content />}
				className={styles.popover}
			>
				<Badge count={cart.length}>
					<ShoppingCartOutlined className={styles.cart} />
				</Badge>
			</Popover>
		</>
	);
};

export default Cart;
