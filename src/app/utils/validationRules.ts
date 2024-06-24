import { Rule } from "antd/es/form";

export const emailRules: Rule[] = [
	{
		required: true,
		message: "Пожалуйста, введите вашу почту",
	},
	{
		pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		message: "Почта должна быть в формате example@domain.com",
	},
];

export const passwordRules: Rule[] = [
	{
		required: true,
		message: "Пожалуйста, введите ваш пароль",
	},
	{
		pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
		message: "Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и специальные символы.",
	},
];

export const confirmPasswordRules: Rule[] = [
	{
		required: true,
		message: "Пожалуйста подтвердите пароль",
	},
	{
		pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
		message: "Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и специальные символы.",
	},
	({ getFieldValue }) => {
		return {
			validator(_, value) {
				if (getFieldValue("password") === value) {
					return Promise.resolve();
				}
				return Promise.reject(new Error("Пароли не совпадают"));
			},
		};
	},
];
