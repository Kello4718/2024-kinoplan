import { message, Popover } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import supabase from "@/supabase";

import { PoweroffOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";

import styles from "./User.module.css";

const UserContent = () => {
	const { userEmail, setUserEmail } = useUser();
	const pathname = usePathname();
	const isMainPage = pathname === "/";

	const toLogOut = async () => {
		try {
			await supabase.auth.signOut();
			setUserEmail("");
		} catch (error) {
			message.error("Ошибка при выходе");
		}
	};

	return (
		<>
			{userEmail ? (
				<ul className={styles.list}>
					{isMainPage && (
						<li className={styles.item}>
							<Link href="/personal-account/general" className={styles.itemLink}>
								<SolutionOutlined />
								<span>Личный кабинет</span>
							</Link>
						</li>
					)}
					<li className={styles.item} onClick={toLogOut}>
						<div className={styles.itemLink}>
							<PoweroffOutlined />
							<span>Выйти</span>
						</div>
					</li>
				</ul>
			) : (
				<div className={styles.buttonContainer}>
					<Link className={styles.button} href="/auth/sign-in">
						Авторизоваться
					</Link>
					<Link className={styles.button} href="/auth/register">
						Зарегистрироваться
					</Link>
				</div>
			)}
		</>
	);
};

const User = () => {
	return (
		<Popover content={<UserContent />} placement="bottom" trigger={"click"}>
			<UserOutlined className={styles.user} />
		</Popover>
	);
};

export default User;
