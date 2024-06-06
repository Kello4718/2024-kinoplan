'use client';

import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Popover } from 'antd';
import Link from 'next/link';

import CartList from '@/components/Cart/CartList/CartList';
import { useBookClub } from '@/hooks';

import styles from './Cart.module.css';

const Content = () => {
	const { cart } = useBookClub();
	const cost = cart.reduce(
		(acc, item) => Number((acc + item.quantity * item.price).toFixed(2)),
		0
	);
	return (
		<div className={styles.cartContainer}>
			{cart.length ? (
				<>
					<p className={styles.text}>Корзина:</p>
					<CartList />
					<div className={styles.totalContainer}>
						<p className={styles.total}>
							<strong>Итого в корзине книг на сумму:</strong>{' '}
							{cost} RUB
						</p>
						<Link href="/cart">Перейти в корзину</Link>
					</div>
				</>
			) : (
				<Link href="/cart">Перейти в корзину</Link>
			)}
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
