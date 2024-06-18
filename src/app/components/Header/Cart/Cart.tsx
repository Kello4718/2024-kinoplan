"use client";

import { Badge, Popover } from "antd";
import Link from "next/link";
import { useEffect } from "react";

import CartList from "@/components/Cart/CartList/CartList";
import { useBookClub } from "@/hooks";
import { Button } from "@/ui";
import { formatCost } from "@/utils";

import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import styles from "./Cart.module.css";

const Content = () => {
	const { cart, setCart, cartCost, setCartCost, setIsCartOpen } = useBookClub();

	const handleDeleteCartOnClick = () => {
		setCart([]);
		setIsCartOpen((prevState) => !prevState);
	};

	useEffect(() => {
		setCartCost(cart.reduce((acc, item) => Number((acc + item.quantity * item.price).toFixed(2)), 0));
	}, [cart, setCartCost]);

	const formatCartCost = formatCost.format(cartCost);

	return (
		<div className={styles.cartContainer}>
			{cart.length ? (
				<>
					<p className={styles.text}>Корзина:</p>
					<CartList />
					<div className={styles.totalContainer}>
						<p className={styles.total}>
							<strong>Итого в корзине книг на сумму:</strong> {formatCartCost}
						</p>
						<Link className={styles.button} href="/cart">
							Перейти в корзину
						</Link>
						<Button className={styles.deleteCart} onClick={handleDeleteCartOnClick}>
							<DeleteOutlined />
						</Button>
					</div>
				</>
			) : (
				<Link className={styles.button} href="/cart">
					Перейти в корзину
				</Link>
			)}
		</div>
	);
};

const Cart = () => {
	const { cart } = useBookClub();
	const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
	return (
		<Popover placement="bottom" trigger={"click"} content={<Content />}>
			<button className={styles.test}>
				<Badge count={quantity} className={styles.test} color="var(--black01)">
					<ShoppingCartOutlined className={styles.cart} />
				</Badge>
			</button>
		</Popover>
	);
};

export default Cart;
