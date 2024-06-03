'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useBookClub } from '../hooks';

import CartList from '../components/Cart/CartList/CartList';
import { Button } from '../ui';
import { Result } from 'antd';

import styles from './styles.module.css';

const Cart = () => {
	const [isPaid, setIsPaid] = useState(false);
	const { cart } = useBookClub();

	const handleButtonPayOnClick = () => {
		setIsPaid(true);
	};
	return (
		<>
			<Link className={styles.buttonBack} href="/">
				Вернуться назад
			</Link>
			{!isPaid ? (
				<>
					<h1 className={styles.title}>Корзина</h1>
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
					title="Подравляю, вы успешно оплатили товары!"
					subTitle="Номер заказа: 2017182818828182881. Чек придет на почту, в течении 5 минут. Хорошего вам дня"
					className={styles.result}
				/>
			)}
		</>
	);
};

export default Cart;
