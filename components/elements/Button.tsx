import { FC, ButtonHTMLAttributes } from "react";
import PropTypes from "prop-types";

interface IButtonExtended extends IButton, ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<IButtonExtended> = ({
	color = "blue",
	disabled = false,
	className,
	label,
	type = "button",
	size = "normal",
	...props
}): JSX.Element => {
	// build classes
	const classArr = ["btn"];
	if (color) classArr.push(`btn--${color}`);
	if (size) classArr.push(`btn--${size}`);
	if (className) classArr.push(className);

	return (
		<button className={classArr.join(" ")} type={type} {...props} disabled={disabled}>
			{label && <span>{label}</span>}
		</button>
	);
};

Button.defaultProps = {
	color: "blue",
	disabled: false,
	className: null,
	label: null,
	type: "button",
	size: "normal"
};

Button.propTypes = {
	color: PropTypes.string,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	label: PropTypes.string,
	type: PropTypes.oneOf(["button", "submit", "reset"]),
	size: PropTypes.oneOf(["normal", "small"])
};

export default Button;
