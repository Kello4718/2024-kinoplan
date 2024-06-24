"use client";

import { Result } from "antd";
import Link from "next/link";
import { ReactNode } from "react";

import Aside from "@/components/PersonalAccount/Aside/Aside";

import { ArrowLeftOutlined } from "@ant-design/icons";

import styles from "./layout.module.css";

const PersonalAccountLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Link className={styles.buttonBack} href="/">
				<ArrowLeftOutlined />
				<span>Вернуться на главную</span>
			</Link>
			<h1>Личный кабинет</h1>
			{localStorage.getItem("userEmail") ? (
				<div className={styles.container}>
					<Aside />
					{children}
				</div>
			) : (
				<Result
					status="warning"
					title={<p className={styles.resultTitle}>Вы не авторизованы!</p>}
					subTitle={
						<>
							<p className={styles.resultSubtitle}>Похоже вы попали на эту ссылку будучи не авторизованным.</p>
							<p className={styles.resultSubtitle}>
								Авторизуйтесь пожалуйста или зарегистрируйтесь, если у вас нет аккаунта.
							</p>
							<div className={styles.resultButtonContainer}>
								<Link className={styles.resultButton} href="/auth/sign-in">
									Авторизоваться
								</Link>
								<Link className={styles.resultButton} href="/auth/register">
									Зарегистрироваться
								</Link>
							</div>
						</>
					}
					className={styles.result}
				/>
			)}
		</>
	);
};

export default PersonalAccountLayout;
