'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useBookClub } from '../hooks';

import CartList from '../components/Cart/CartList/CartList';
import { Button } from '../ui';
import { Result } from 'antd';

import styles from './page.module.css';
import { ArrowLeftOutlined } from '@ant-design/icons';

const Cart = () => {
	const [isPaid, setIsPaid] = useState(false);
	const { cart, setCart } = useBookClub();

	const handleButtonPayOnClick = () => {
		setIsPaid(true);
		setCart([]);
	};
	return (
		<>
			<Link className={styles.buttonBack} href="/">
				<ArrowLeftOutlined />
				<span>Вернуться назад</span>
			</Link>
			{!isPaid ? (
				<>
					<h1>Корзина</h1>
					{cart.length ? (
						<>
							<CartList />
							<Button
								onClick={handleButtonPayOnClick}
								className={styles.buttonPay}
							>
								Оплатить
							</Button>
						</>
					) : (
						<p className={styles.empty}>
							Тут ничего нет. Вам стоит добавить товары в корзину
							и вернуться сюда после этого! :)
						</p>
					)}
				</>
			) : (
				<Result
					status="success"
					title={<p className={styles.title}>Подравляю, вы успешно оплатили товары!</p>}
					subTitle={<p className={styles.subtitle}>Номер заказа: 2017182818828182881. Чек придет на почту, в течении 5 минут. Хорошего вам дня</p>}
					className={styles.result}
				/>
			)}
		</>
	);
};

export default Cart;
