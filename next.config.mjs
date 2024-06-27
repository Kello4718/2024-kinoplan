/** @type {import('next').NextConfig} */

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
	images: {
		domains: ["books.google.com"],
	},
	env: {
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	},
	reactStrictMode: true,
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.alias["@"] = path.resolve(__dirname);
		}
		return config;
	},
};

export default nextConfig;
