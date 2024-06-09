"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Result } from "antd";
import Link from "next/link";
import { useState } from "react";

import CartList from "@/components/Cart/CartList/CartList";
import { useBookClub } from "@/hooks";
import { Button } from "@/ui";

import styles from "./page.module.css";

const Cart = () => {
	const [isPaid, setIsPaid] = useState(false);
	const { cart, setCart } = useBookClub();
	const cost = cart.reduce(
		(acc, item) => Number((acc + item.quantity * item.price).toFixed(2)),
		0,
	);
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
							<p className={styles.total}>
								<strong>Итого в корзине книг на сумму:</strong>{" "}
								{cost} RUB
							</p>
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
					title={
						<p className={styles.title}>
							Подравляю, вы успешно оплатили товары!
						</p>
					}
					subTitle={
						<p className={styles.subtitle}>
							Номер заказа: 2017182818828182881. Чек придет на
							почту, в течении 5 минут. Хорошего вам дня
						</p>
					}
					className={styles.result}
				/>
			)}
		</>
	);
};

export default Cart;
