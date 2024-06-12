"use client";

import { ChangeEvent } from "react";

import { useBookClub } from "@/hooks";
import supabase from "@/supabase";
import { Button, Form, FormProps, Input } from "antd";

import styles from "./page.module.css";
import { User } from "@/types";
import { useRouter } from "next/navigation";


type FieldType = {
	email?: string;
	password?: string;
};

const SignInPage = () => {
    const router = useRouter();

    const localeStorageUserEmail = localStorage.getItem('userEmail')
    const localeStorageUserPassword = localStorage.getItem('userPassword')

    if (localeStorageUserEmail && localeStorageUserPassword) {
        router.push("/personal-account/general");
    }

	const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
		errorInfo,
	) => {
		console.log("Failed:", errorInfo);
	};

	const onFinish: FormProps<FieldType>["onFinish"] = async ({
		email,
		password,
	}) => {
		// const { data, error } = await supabase.auth.signInWithPassword({
		// 	email: values?.email ?? "",
		// 	password: values?.password ?? "",
		// });
		let { data: users, error } = await supabase.from("Users").select("*");
		const userFromBack: User = users?.find(
			(user: User) => user.email === email,
		);
		if (userFromBack) {
			if (
				email === userFromBack.email &&
				password === userFromBack.password
			) {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userPassword', password);
				router.push("/personal-account/general");
			} else {
				return;
			}
		}
	};

	return (
		<section>
			<h1>Страница авторизации</h1>
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
						Авторизоваться
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

export default SignInPage;
