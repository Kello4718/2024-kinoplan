import { Filter } from "../types";

const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=all';

const SELECT_KEY_MAP: Record<string, keyof Filter> = {
	'По жанрам': 'category',
	'По году издания': 'year',
	'По автору': 'author',
};

export { API_URL, SELECT_KEY_MAP };
