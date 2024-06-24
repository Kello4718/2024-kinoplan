"use client";

import { Button, Form, FormProps, Input, message } from "antd";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import supabase from "@/supabase";
import { FieldType } from "@/types";
import { emailRules, passwordRules } from "@/utils";

import styles from "./page.module.css";

const SignInPage = () => {
	const { setUserEmail } = useUser();
	const router = useRouter();

	const onFinish: FormProps<FieldType>["onFinish"] = async ({ email, password }) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			message.error("Введенные данные неправильны");
		} else {
			setUserEmail(email);
			router.push("/personal-account/general");
		}
	};

	return (
		<section>
			<h1>Страница авторизации</h1>
			<Form name="signin" onFinish={onFinish} autoComplete="off" className={styles.form}>
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
