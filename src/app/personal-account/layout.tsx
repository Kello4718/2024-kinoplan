"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { AuthError } from "@supabase/supabase-js";
import { Result } from "antd";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

import Aside from "@/components/PersonalAccount/Aside/Aside";
import { useBookClub } from "@/hooks";
import supabase from "@/supabase";

import styles from "./layout.module.css";

const PersonalAccountLayout = ({ children }: { children: ReactNode }) => {
	const [errorStatus, setErrorStatus] = useState<AuthError | null>(null);
	const { user } = useBookClub();
	useEffect(() => {
		const fetchUser = async () => {
			const { error } = await supabase.auth.signInWithPassword({
				email: user.email,
				password: user.password,
			});
			setErrorStatus(error);
		};

		fetchUser();
	}, [user.email, user.password]);
	return (
		<div>
			<Link className={styles.buttonBack} href="/">
				<ArrowLeftOutlined />
				<span>Вернуться на главную</span>
			</Link>
			<h1>Личный кабинет</h1>
			{!errorStatus ? (
				<div className={styles.container}>
					<Aside />
					{children}
				</div>
			) : (
				<Result
					status="warning"
					title={
						<p className={styles.resultTitle}>
							Вы не авторизованы!
						</p>
					}
					subTitle={
						<>
							<p className={styles.resultSubtitle}>
								Похоже вы попали на эту ссылку будучи не
								авторизованным.
								<br />
								Авторизуйтесь пожалуйста или зарегистрируйтесь,
								если у вас нет аккаунта.
							</p>
							<Link className={styles.resultButton} href="/auth">
								Авторизоваться
							</Link>
						</>
					}
					className={styles.result}
				/>
			)}
		</div>
	);
};

export default PersonalAccountLayout;
