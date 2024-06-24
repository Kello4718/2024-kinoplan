"use client";

import { Button, Form, FormProps, Input, message } from "antd";

import supabase from "@/supabase";
import { FieldType } from "@/types";
import { passwordRules } from "@/utils";

import styles from "./page.module.css";

const GeneralPage = () => {
	const [form] = Form.useForm();
	const onFinish: FormProps<FieldType>["onFinish"] = async ({ password }) => {
		const { error } = await supabase.auth.updateUser({ password });
		if (error) {
			message.error("Пароли не отличаются");
		} else {
			message.success("Данные успешно обновлены");
		}
	};

	const initialValues = {
		email: localStorage.getItem("userEmail"),
	};

	return (
		<Form form={form} onFinish={onFinish} className={styles.form} initialValues={initialValues}>
			<Form.Item<FieldType> name="email" className={styles.email}>
				<Input className={styles.input} placeholder="Введите почту" readOnly autoComplete="username" />
			</Form.Item>

			<Form.Item<FieldType> name="password" rules={passwordRules} validateTrigger="onSubmit" className={styles.formItem}>
				<Input.Password className={styles.input} placeholder="Введите новый пароль" autoComplete="new-password" />
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
