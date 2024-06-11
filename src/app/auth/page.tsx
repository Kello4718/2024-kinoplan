"use client";

import { ChangeEvent, FormEvent } from "react";

import { useBookClub } from "@/hooks";
import supabase from "@/supabase";

const AuthPage = () => {
	const { user, setUser } = useBookClub();

	const handleOnInput = (evt: ChangeEvent<HTMLInputElement>, key: string) => {
		setUser((prevState) => {
			return {
				...prevState,
				[key]: evt.target.value,
			};
		});
	};

	const handleOnSubmit = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		const { data, error } = await supabase.auth.signInWithPassword({
			email: user.email,
			password: user.password,
		});
		console.log(data, error);
	};

	return (
		<form onSubmit={handleOnSubmit}>
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
			{/* <button formAction={signup}>Sign up</button> */}
		</form>
	);
};

export default AuthPage;
