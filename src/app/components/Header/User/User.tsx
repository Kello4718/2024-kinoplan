import {
	PoweroffOutlined,
	SolutionOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useBookClub } from "@/hooks";

import styles from "./User.module.css";

const UserContent = () => {
	const { user, setUser } = useBookClub();
	const pathname = usePathname();
	const isMainPage = pathname === "/";

	const toLogOut = () => {
		localStorage.setItem("userEmail", "");
		localStorage.setItem("userPassword", "");
		setUser({ email: "", password: "" });
	};

	return (
		<>
			{user.email && user.password ? (
				<ul className={styles.list}>
					{isMainPage && (
						<li className={styles.item}>
							<Link
								href="/personal-account/general"
								className={styles.itemLink}
							>
								<SolutionOutlined />
								<span>Личный кабинет</span>
							</Link>
						</li>
					)}
					<li className={styles.item} onClick={toLogOut}>
						<Link href="/logout" className={styles.itemLink}>
							<PoweroffOutlined />
							<span>Выйти</span>
						</Link>
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

const User = () => (
	<Popover content={UserContent}>
		<UserOutlined className={styles.user} />
	</Popover>
);

export default User;
