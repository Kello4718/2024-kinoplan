import { FC, ReactNode } from "react";

type ButtonProps = {
	className: string;
	onClick: () => void;
	children: ReactNode;
};

export const Button: FC<ButtonProps> = ({ className, onClick, children }) => (
	<button className={className} onClick={onClick}>
		{children}
	</button>
);
