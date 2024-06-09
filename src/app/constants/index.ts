import { Filter } from "@/types";

export const API_URL = "https://www.googleapis.com/books/v1/volumes?q=all";

export const SELECT_MAP: Record<keyof Filter, string> = {
	category: "По жанрам",
	year: "По году издания",
	author: "По автору",
};
