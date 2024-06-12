"use client";

import { ChangeEvent, FormEvent } from "react";

import { useBookClub } from "@/hooks";
import supabase from "@/supabase";
import { Button, Form, FormProps, Input } from "antd";

import styles from "./page.module.css";

type FieldType = {
	email?: string;
	password?: string;
};

const RegisterPage = () => {
	const localeStorageUserEmail = localStorage.getItem("userEmail");
	const localeStorageUserPassword = localStorage.getItem("userPassword");

	// const handleOnSubmit = async (evt: FormEvent<HTMLFormElement>) => {
	// 	evt.preventDefault();
	// 	const { data, error } = await supabase.auth.signInWithPassword({
	// 		email: localeStorageUserEmail ?? ,
	// 		password: localeStorageUserPassword,
	// 	});
	// 	console.log(data, error);
	// };

	const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
		errorInfo,
	) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<section>
			<h1>Страница регистрации</h1>
			<Form
				name="basic"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
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
					<Input className={styles.input} placeholder="Ваша почта" />
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
			{/* <form onSubmit={handleOnSubmit}>
				<label htmlFor="email">Email:</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					value={user.email}
					onChange={(evt) => handleOnInput(evt, "email")}
				/>
				<label htmlFor="password">Password:</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					value={user.password}
					onChange={(evt) => handleOnInput(evt, "password")}
				/>
				<button>Log in</button>
			</form> */}
		</section>
	);
};

export default RegisterPage;
