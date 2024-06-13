"use client";

import { Button, Form, FormProps, Input, message } from "antd";
import { ChangeEvent, useState } from "react";

import { useBookClub } from "@/hooks";
import supabase from "@/supabase";
import { FieldType } from "@/types";

import styles from "./page.module.css";

const GeneralPage = () => {
	const [isVisible, setIsVisible] = useState(false);
	const { user, setUser } = useBookClub();
	const onFinish: FormProps<FieldType>["onFinish"] = async ({
		email,
		password,
	}) => {
		await supabase
			.from("Users")
			.update({ email, password })
			.eq("email", email)
			.select();

		localStorage.setItem("userEmail", email);
		localStorage.setItem("userPassword", password);
		message.success("Данные успешно обновлены");
		setUser({ email, password });
		setIsVisible(false);
	};

	const handleInputOnChange = (
		evt: ChangeEvent<HTMLInputElement>,
		value: string,
		type: string,
	) => {
		setUser((prevState) => {
			return { ...prevState, [type]: value };
		});
		if (evt.target.value !== value) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	return (
		<Form
			name="general"
			onFinish={onFinish}
			autoComplete="off"
			className={styles.form}
		>
			<Form.Item<FieldType> name="email" className={styles.formItem}>
				<Input
					className={styles.input}
					placeholder="Ваша почта"
					value={user.email}
					onChange={(evt) =>
						handleInputOnChange(evt, user.email, "email")
					}
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
					value={user.password}
					onChange={(evt) => {
						handleInputOnChange(evt, user.password, "password");
					}}
				/>
			</Form.Item>

			{isVisible && (
				<Form.Item className={styles.formItem}>
					<Button
						className={styles.submit}
						type="primary"
						htmlType="submit"
					>
						Обновить данные
					</Button>
				</Form.Item>
			)}
		</Form>
	);
};

export default GeneralPage;
