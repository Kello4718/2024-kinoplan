/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["books.google.com"],
	},
	env: {
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
	},
	reactStrictMode: true,
};
export default nextConfig;
