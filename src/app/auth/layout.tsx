"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ReactNode } from "react";

import styles from "./layout.module.css";

const PersonalAccountLayout = ({ children }: { children: ReactNode }) => (
	<>
		<Link className={styles.buttonBack} href="/">
			<ArrowLeftOutlined />
			<span>Вернуться на главную</span>
		</Link>
		{children}
	</>
);

export default PersonalAccountLayout;
