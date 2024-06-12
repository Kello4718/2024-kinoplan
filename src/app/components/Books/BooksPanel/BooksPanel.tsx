import { TableOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import { useBookClub } from "@/hooks";

import BooksFilter from "./BooksFilter/BooksFilter";
import BooksSorted from "./BooksSorted/BooksSorted";

import styles from "./BooksPanel.module.css";

const BooksPanel = () => {
	const { view, setView } = useBookClub();
	const handleViewButtonOnClick = () => {
		if (view === "table") {
			setView("line");
		} else {
			setView("table");
		}
	};

	return (
		<div className={styles.panel}>
			<BooksFilter />
			<BooksSorted />
			<Tooltip
				placement="topRight"
				color="#f4eee6"
				title={<span className={styles.tooltipText}>Вид книг</span>}
			>
				{view === "line" ? (
					<TableOutlined
						className={styles.tooltip}
						onClick={handleViewButtonOnClick}
					/>
				) : (
					<UnorderedListOutlined
						className={styles.tooltip}
						onClick={handleViewButtonOnClick}
					/>
				)}
			</Tooltip>
		</div>
	);
};

export default BooksPanel;
