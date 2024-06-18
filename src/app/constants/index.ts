import { Filter } from "@/types";

export const API_URL = "https://www.googleapis.com/books/v1/volumes?q=all";

export const LABELS_OF_BOOKS_FILTER: Record<keyof Filter, string> = {
	category: "По жанрам",
	year: "По году издания",
	author: "По автору",
};

export type RequirementsForPassword = Record<
	"hasUpperCase" | "hasLowerCase" | "hasNumber" | "hasSpecialChar" | "minLength",
	boolean
>;

export const enum KIND_OF_BOOKS_SORT {
	Asc = "asc",
	Desc = "desc",
}

export const enum KIND_OF_BOOKS_FILTER {
	Author = "author",
	Year = "year",
	Category = "category",
}

export const enum KIND_OF_BOOKS_VIEW {
	Line = "line",
	Table = "table",
}

export const enum SUPABASE_TABLES {
	Users = "Users",
}

export const enum PAGES {
	Main = "/",
}

export const enum KEYS_ON_KEYBOARD {
	Escape = "Escape",
}
