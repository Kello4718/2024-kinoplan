"use client";

import { Button, Form, FormProps, Input, message } from "antd";

import { useUser } from "@/hooks/useUser";
import supabase from "@/supabase";
import { FieldType } from "@/types";

import styles from "./page.module.css";

const GeneralPage = () => {
	const { userEmail } = useUser();

	const onFinish: FormProps<FieldType>["onFinish"] = async ({ password }) => {
		const { error } = await supabase.auth.updateUser({ password });
		if (error) {
			message.error("Пароли не отличаются");
		} else {
			message.success("Данные успешно обновлены");
		}
	};

	const initialValues = {
		email: userEmail,
	};

	return (
		<Form onFinish={onFinish} autoComplete="off" className={styles.form} initialValues={initialValues}>
			<Form.Item<FieldType> name="email" className={styles.formItem}>
				<Input className={styles.input} placeholder="Введите почту" readOnly />
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
					Обновить данные
				</Button>
			</Form.Item>
		</Form>
	);
};

export default GeneralPage;
