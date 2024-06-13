"use client";

import { Button, Form, FormProps, Input, message, Result } from "antd";
import Link from "next/link";
import { useState } from "react";

import supabase from "@/supabase";
import { FieldType, User } from "@/types";

import styles from "./page.module.css";

const RegisterPage = () => {
	const [isSuccess, setIsSuccess] = useState(false);

	const onFinish: FormProps<FieldType>["onFinish"] = async ({
		email,
		password,
	}) => {
		const { data: users } = await supabase.from("Users").select("*");
		const userFromBack: User = users?.find(
			(user: User) => user.email === email,
		);

		if (userFromBack) {
			message.error("Данный пользователь уже существует");
			return;
		}

		await supabase.from("Users").insert([{ email, password }]).select();
		setIsSuccess(true);
	};

	return (
		<section>
			<h1>Страница регистрации</h1>
			{isSuccess ? (
				<Result
					status="success"
					title={
						<p className={styles.resultTitle}>
							Вы успешно зарегистрировались
						</p>
					}
					subTitle={
						<Link
							className={styles.resultButton}
							href="/auth/sign-in"
						>
							Авторизоваться
						</Link>
					}
					className={styles.result}
				/>
			) : (
				<Form
					name="register"
					onFinish={onFinish}
					autoComplete="off"
					className={styles.form}
				>
					<Form.Item<FieldType>
						name="email"
						rules={[
							{
								required: true,
								message: "Пожалуйста, введите вашу почту",
							},
						]}
						className={styles.formItem}
					>
						<Input
							className={styles.input}
							placeholder="Ваша почта"
						/>
					</Form.Item>

					<Form.Item<FieldType>
						name="password"
						rules={[
							{
								required: true,
								message: "Пожалуйста, введите ваш пароль",
							},
						]}
						className={styles.formItem}
					>
						<Input.Password
							className={styles.input}
							placeholder="Ваш пароль"
						/>
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
							({ getFieldValue }) => {
								return {
									validator(_, value) {
										if (
											!value ||
											getFieldValue("password") === value
										) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error("Пароли не совпадают"),
										);
									},
								};
							},
						]}
					>
						<Input.Password
							className={styles.input}
							placeholder="Подтвердите ваш пароль"
						/>
					</Form.Item>
					<Form.Item className={styles.formItem}>
						<Button
							className={styles.submit}
							type="primary"
							htmlType="submit"
						>
							Зарегистрироваться
						</Button>
					</Form.Item>
				</Form>
			)}
		</section>
	);
};

export default RegisterPage;
