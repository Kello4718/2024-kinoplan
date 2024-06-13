import { ArrowLeftOutlined } from "@ant-design/icons";
import { Result } from "antd";
import Link from "next/link";

import styles from "./page.module.css";

const page = () => (
	<>
		<Link className={styles.buttonBack} href="/">
			<ArrowLeftOutlined />
			<span>Вернуться на главную</span>
		</Link>
		<Result
			status="success"
			title={
				<p className={styles.resultTitle}>
					Вы вышли с личного кабинета
				</p>
			}
			subTitle={
				<p className={styles.resultSubtitle}>Всего вам хорошего</p>
			}
			className={styles.result}
		/>
	</>
);

export default page;
