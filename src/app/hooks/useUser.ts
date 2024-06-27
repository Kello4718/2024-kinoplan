import { useContext } from "react";

import { TUserContext, UserContext } from "@/context/User";

export const useUser = (): TUserContext => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser должен использоваться внутри UserContextProvider");
	}
	return context;
};
