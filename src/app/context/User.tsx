"use client";

import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

import supabase from "@/supabase";

export type TUserContext = {
	isAuth: boolean;
	setIsAuth: Dispatch<SetStateAction<boolean>>;
	userEmail: string | undefined;
	setUserEmail: Dispatch<SetStateAction<string | undefined>>;
};

export const UserContext = createContext<TUserContext | undefined>({
	isAuth: false,
	setIsAuth: () => {},
	userEmail: "",
	setUserEmail: () => {},
});

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);
	const [userEmail, setUserEmail] = useState<string | undefined>("");

	const value: TUserContext = useMemo(
		() => ({
			isAuth,
			setIsAuth,
			userEmail,
			setUserEmail,
		}),
		[isAuth, userEmail],
	);

	const checkUser = useCallback(async () => {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				setIsAuth(true);
				setUserEmail(user.email);
			}
		} catch (error) {
			setIsAuth(false);
			setUserEmail("");
		}
	}, [setIsAuth, setUserEmail]);

	useEffect(() => {
		checkUser();
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			setIsAuth(Boolean(session?.user.email));
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [checkUser, setIsAuth, setUserEmail]);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
