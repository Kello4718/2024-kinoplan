"use client";

import { Button, Form, FormProps, Input, message, Result } from "antd";
import Link from "next/link";
import { useState } from "react";

import supabase from "@/supabase";
import { FieldType } from "@/types";
import { confirmPasswordRules, emailRules, passwordRules } from "@/utils";

import styles from "./page.module.css";

const RegisterPage = () => {
	const [isRegisterPassed, setIsRegisterPassed] = useState(false);

	const onFinish: FormProps<FieldType>["onFinish"] = async ({ email, password }) => {
		const { error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			message.error("Данный пользователь уже существует");
		} else {
			setIsRegisterPassed(true);
		}
	};

	return (
		<section>
			<h1>Страница регистрации</h1>
			{isRegisterPassed ? (
				<Result
					status="success"
					title={<p className={styles.resultTitle}>Вы успешно зарегистрировались</p>}
					subTitle={
						<Link className={styles.resultButton} href="/auth/sign-in">
							Авторизоваться
						</Link>
					}
					className={styles.result}
				/>
			) : (
				<Form name="register" onFinish={onFinish} autoComplete="false" className={styles.form}>
					<Form.Item<FieldType> name="email" rules={emailRules} validateTrigger="onSubmit" className={styles.formItem}>
						<Input className={styles.input} placeholder="Введите почту" autoComplete="username" />
					</Form.Item>

					<Form.Item<FieldType>
						name="password"
						rules={passwordRules}
						validateTrigger="onSubmit"
						className={styles.formItem}
					>
						<Input.Password className={styles.input} placeholder="Введите пароль" autoComplete="new-password" />
					</Form.Item>
					<Form.Item
						name="confirm"
						dependencies={["password"]}
						hasFeedback
						className={styles.formItem}
						rules={confirmPasswordRules}
						validateTrigger="onSubmit"
					>
						<Input.Password
							className={styles.input}
							placeholder="Подтвердите ваш пароль"
							autoComplete="new-password"
						/>
					</Form.Item>
					<Form.Item className={styles.formItem}>
						<Button className={styles.submit} type="primary" htmlType="submit">
							Зарегистрироваться
						</Button>
					</Form.Item>
				</Form>
			)}
		</section>
	);
};

export default RegisterPage;
