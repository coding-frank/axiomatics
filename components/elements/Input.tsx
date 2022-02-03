import { FC } from "react";
import PropTypes from "prop-types";

const Input: FC<IInput> = ({
	type,
	name,
	disabled,
	onChange,
	className,
	placeholder,
	id,
	value,
	checked
}): JSX.Element => {
	if (type === "radio") {
		return (
			<input
				type={type}
				name={name}
				id={id || null}
				className={className || null}
				checked={checked || false}
				disabled={disabled}
				value={value}
				onChange={(e) => onChange(e)}
			/>
		);
	}

	return (
		<input
			type={type}
			name={name}
			id={id || null}
			className={className || null}
			placeholder={placeholder}
			value={value}
			disabled={disabled}
			onChange={(e) => onChange(e)}
		/>
	);
};

Input.defaultProps = {
	className: null,
	id: null,
	type: "text",
	checked: false,
	disabled: false,
	value: ""
};

Input.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func
};

export default Input;
