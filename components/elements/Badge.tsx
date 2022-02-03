import { FC } from "react";
import PropTypes from "prop-types";

const Badge: FC<{
	bg?: TType;
	label: string;
	className?: string;
}> = ({ bg, className, label }): JSX.Element => {
	// build classes
	const classArr = ["badge"];
	if (bg) classArr.push(`bg-${bg}`);
	if (className) classArr.push(className);

	return <span className={classArr.join(" ")}>{label}</span>;
};

Badge.defaultProps = {
	bg: "human",
	label: null,
	className: null
};

Badge.propTypes = {
	bg: PropTypes.oneOf(["desk", "computer", "keyboard", "server", "human"]),
	label: PropTypes.string,
	className: PropTypes.string
};

export default Badge;
