"use client";

import { Button, Form, FormProps, Input, message } from "antd";
import { useRouter } from "next/navigation";

import { useBookClub } from "@/hooks";
import supabase from "@/supabase";
import { FieldType, User } from "@/types";

import styles from "./page.module.css";

const SignInPage = () => {
	const { setUser } = useBookClub();
	const router = useRouter();

	const localeStorageUserEmail = localStorage.getItem("userEmail");
	const localeStorageUserPassword = localStorage.getItem("userPassword");

	if (localeStorageUserEmail && localeStorageUserPassword) {
		router.push("/personal-account/general");
	}

	const onFinish: FormProps<FieldType>["onFinish"] = async ({
		email,
		password,
	}) => {
		const { data: users } = await supabase.from("Users").select("*");
		const userFromBack: User = users?.find(
			(user: User) => user.email === email,
		);
		if (userFromBack) {
			if (
				email === userFromBack.email &&
				password === userFromBack.password
			) {
				localStorage.setItem("userEmail", email);
				localStorage.setItem("userPassword", password);
				router.push("/personal-account/general");
				setUser({ email, password });
			} else {
				message.error("Введенные данные неправильны");
			}
		}
	};

	return (
		<section>
			<h1>Страница авторизации</h1>
			<Form
				name="signin"
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
		</section>
	);
};

export default SignInPage;
