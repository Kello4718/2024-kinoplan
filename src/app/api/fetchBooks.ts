import { Dispatch, SetStateAction } from "react";

import { API_URL } from "@/constants";
import { Book } from "@/types";
import { transformDataFromBack } from "@/utils";

export const fetchBooks = async ({
	setIsLoading,
	setBooks,
	setIsError,
}: {
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	setBooks: Dispatch<SetStateAction<Book[]>>;
	setIsError: Dispatch<SetStateAction<boolean>>;
}) => {
	try {
		setIsLoading(true);
		const res = await fetch(API_URL, {
			method: "GET",
			mode: "cors",
		});
		if (!res.ok) {
			throw new Error(`Server status is ${res.status}`);
		}
		const data = await res.json();
		const transformedData = await transformDataFromBack(data.items);
		setBooks(transformedData);
		setIsError(false);
	} catch (error) {
		setIsError(true);
	} finally {
		setIsLoading(false);
	}
};
