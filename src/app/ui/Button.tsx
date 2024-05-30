import { FC, ReactNode } from 'react';

type ButtonProps = {
	className: string;
	onClick: () => void;
	children: ReactNode;
};

const Button: FC<ButtonProps> = ({ className, onClick, children }) => {
	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
};

export { Button };
