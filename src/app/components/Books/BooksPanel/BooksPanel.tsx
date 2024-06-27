import { Tooltip } from "antd";

import { KIND_OF_BOOKS_VIEW } from "@/constants";
import { useBookClub } from "@/hooks";

import BooksFilter from "./BooksFilter/BooksFilter";
import BooksSorted from "./BooksSorted/BooksSorted";

import { TableOutlined, UnorderedListOutlined } from "@ant-design/icons";

import styles from "./BooksPanel.module.css";

const BooksPanel = () => {
	const { view, setView } = useBookClub();

	const handleViewButtonOnClick = () => {
		if (view !== KIND_OF_BOOKS_VIEW.Line) {
			setView(KIND_OF_BOOKS_VIEW.Line);
		} else {
			setView(KIND_OF_BOOKS_VIEW.Table);
		}
	};

	return (
		<div className={styles.panel}>
			<BooksFilter />
			<BooksSorted />
			<Tooltip placement="topRight" color="var(--azure00)" title={<span className={styles.tooltipText}>Вид книг</span>}>
				{view === KIND_OF_BOOKS_VIEW.Line ? (
					<TableOutlined className={styles.tooltip} onClick={handleViewButtonOnClick} />
				) : (
					<UnorderedListOutlined className={styles.tooltip} onClick={handleViewButtonOnClick} />
				)}
			</Tooltip>
		</div>
	);
};

export default BooksPanel;
