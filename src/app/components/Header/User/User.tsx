import { Popover } from "antd";
import Link from "next/link";

import styles from "./User.module.css";
import {
    PoweroffOutlined,
    SolutionOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

const localeStorageUserEmail = localStorage.getItem("userEmail");
const localeStorageUserPassword = localStorage.getItem("userPassword");

const UserContent = () => {
    const pathname = usePathname();
	const isMainPage = pathname === "/";

	const toLogOut = () => {
		localStorage.setItem("userEmail", "");
		localStorage.setItem("userPassword", "");
	};

	return (
		<>
			{localeStorageUserEmail && localeStorageUserPassword ? (
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

const User = () => {
	return (
		<Popover content={UserContent}>
			<UserOutlined className={styles.user} />
		</Popover>
	);
};

export default User;
