"use client";

import { Result } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

import CartList from "@/components/Cart/CartList/CartList";
import { useBookClub } from "@/hooks";
import { Button } from "@/ui";
import { formatCost } from "@/utils";

import { ArrowLeftOutlined } from "@ant-design/icons";

import styles from "./page.module.css";

const CartPage = () => {
	const [isPaid, setIsPaid] = useState(false);
	const { cart, setCart, cartCost, setCartCost } = useBookClub();

	const handleButtonPayOnClick = () => {
		setIsPaid(true);
		setCart([]);
	};

	useEffect(() => {
		setCartCost(cart.reduce((acc, item) => Number((acc + item.quantity * item.price).toFixed(2)), 0));
	}, [cart, setCartCost]);

	const formatCartCost = formatCost.format(cartCost);

	return (
		<>
			<Link className={styles.buttonBack} href="/">
				<ArrowLeftOutlined />
				<span>Вернуться на главную</span>
			</Link>
			{!isPaid ? (
				<>
					<h1>Корзина</h1>
					{cart.length ? (
						<>
							<CartList />
							<p className={styles.total}>
								<strong>Итого в корзине книг на сумму:</strong> {formatCartCost}
							</p>
							<Button onClick={handleButtonPayOnClick} className={styles.buttonPay}>
								Оплатить
							</Button>
						</>
					) : (
						<Result
							status="info"
							title={<p className={styles.resultTitle}>На данный момент в корзине ничего нет</p>}
							subTitle={
								<p className={styles.resultSubtitle}>
									Чтобы начать покупки кликните{" "}
									<Link className={styles.buttonToMain} href="/">
										сюда
									</Link>
								</p>
							}
							className={styles.result}
						/>
					)}
				</>
			) : (
				<Result
					status="success"
					title={<p className={styles.resultTitle}>Подравляю, вы успешно оплатили товары!</p>}
					subTitle={
						<p className={styles.resultSubtitle}>
							Номер заказа: 2017182818828182881. Чек придет на почту, в течении 5 минут. Хорошего вам дня
						</p>
					}
					className={styles.result}
				/>
			)}
			;
		</>
	);
};

export default CartPage;
