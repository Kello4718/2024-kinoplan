"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { HeartOutlined, HistoryOutlined, IdcardOutlined } from "@ant-design/icons";

import styles from "./Aside.module.css";

const Aside = () => {
	const path = usePathname();

	return (
		<aside className={styles.aside}>
			<ul className={styles.list}>
				<li className={`${styles.item} ${path === "/personal-account/general" ? styles.itemActive : ""}`}>
					<Link href={"/personal-account/general"} className={styles.itemLink}>
						<IdcardOutlined className={styles.icon} />
						<span className={styles.text}>Общая</span>
					</Link>
				</li>
				<li className={`${styles.item} ${path === "/personal-account/favourite" ? styles.itemActive : ""}`}>
					<Link href={"/personal-account/favourite"} className={styles.itemLink}>
						<HeartOutlined className={styles.icon} />
						<span className={styles.text}>Избранное</span>
					</Link>
				</li>
				<li className={`${styles.item} ${path === "/personal-account/history" ? styles.itemActive : ""}`}>
					<Link href={"/personal-account/history"} className={styles.itemLink}>
						<HistoryOutlined className={styles.icon} />
						<span className={styles.text}>История</span>
					</Link>
				</li>
			</ul>
		</aside>
	);
};

export default Aside;
