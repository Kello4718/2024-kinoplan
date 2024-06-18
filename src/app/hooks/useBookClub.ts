import { useContext } from "react";

import { BookClubContext, TBookClubContext } from "@/context/BookClub";

export const useBookClub = (): TBookClubContext => {
	const context = useContext(BookClubContext);
	if (context === undefined) {
		throw new Error("useBookClub должен использоваться внутри BookClubContextProvider");
	}
	return context;
};
