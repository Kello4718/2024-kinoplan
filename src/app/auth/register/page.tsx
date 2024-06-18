"use client";

import { Button, Form, FormProps, Input, message, Result } from "antd";
import Link from "next/link";
import { useState } from "react";

import supabase from "@/supabase";
import { FieldType } from "@/types";

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
				<Form name="register" onFinish={onFinish} autoComplete="off" className={styles.form}>
					<Form.Item<FieldType>
						name="email"
						rules={[
							{
								required: true,
								message: "Пожалуйста, введите вашу почту",
								validateTrigger: "onSubmit",
							},
							{
								pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: "Почта должна быть в формате example@domain.com",
								validateTrigger: "onSubmit",
							},
						]}
						className={styles.formItem}
					>
						<Input className={styles.input} placeholder="Введите почту" autoComplete="off" />
					</Form.Item>

					<Form.Item<FieldType>
						name="password"
						rules={[
							{
								required: true,
								message: "Пожалуйста, введите ваш пароль",
								validateTrigger: "onSubmit",
							},
							{
								pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
								message:
									"Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и специальные символы.",
								validateTrigger: "onSubmit",
							},
						]}
						className={styles.formItem}
					>
						<Input.Password className={styles.input} placeholder="Введите пароль" autoComplete="off" />
					</Form.Item>
					<Form.Item
						name="confirm"
						dependencies={["password"]}
						hasFeedback
						className={styles.formItem}
						rules={[
							{
								required: true,
								message: "Пожалуйста подтвердите пароль",
							},
							{
								pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
								message:
									"Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и специальные символы.",
							},
							({ getFieldValue }) => {
								return {
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error("Пароли не совпадают"));
									},
								};
							},
						]}
						validateTrigger="onSubmit"
					>
						<Input.Password className={styles.input} placeholder="Подтвердите ваш пароль" autoComplete="off" />
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
