import { FC, ReactNode } from "react";
import PropTypes from "prop-types";

const MessageComponent: FC<{
	color?: string;
	children: ReactNode;
}> = ({ children, color }): JSX.Element => {
	return <div className={`alert alert--${color}`}>{children}</div>;
};

MessageComponent.defaultProps = {
	color: "red"
};

MessageComponent.propTypes = {
	color: PropTypes.oneOf(["red", "green"])
};

export default MessageComponent;
