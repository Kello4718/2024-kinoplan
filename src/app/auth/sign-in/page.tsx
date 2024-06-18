"use client";

import { Button, Form, FormProps, Input, message } from "antd";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import supabase from "@/supabase";
import { FieldType } from "@/types";

import styles from "./page.module.css";

const SignInPage = () => {
	const { setIsAuth, setUserEmail } = useUser();
	const router = useRouter();

	const onFinish: FormProps<FieldType>["onFinish"] = async ({ email, password }) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			message.error("Введенные данные неправильны");
		} else {
			router.push("/personal-account/general");
			setIsAuth(true);
			setUserEmail(email);
		}
	};

	return (
		<section>
			<h1>Страница авторизации</h1>
			<Form name="signin" onFinish={onFinish} autoComplete="off" className={styles.form}>
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
						},
						{
							pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
							message:
								"Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и специальные символы.",
						},
					]}
					validateTrigger="onSubmit"
					className={styles.formItem}
				>
					<Input.Password className={styles.input} placeholder="Введите пароль" autoComplete="off" />
				</Form.Item>

				<Form.Item className={styles.formItem}>
					<Button className={styles.submit} type="primary" htmlType="submit">
						Авторизоваться
					</Button>
				</Form.Item>
			</Form>
		</section>
	);
};

export default SignInPage;
