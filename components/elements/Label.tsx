import { FC } from "react";
import PropTypes from "prop-types";

const Label: FC<ILabel> = ({ label, className, inline, name, id, required }): JSX.Element => {
	if (!label) return null;

	// build classes
	const classArr = [];
	if (className) classArr.push(className);
	if (inline) classArr.push("inline");

	return (
		<label className={(classArr.length > 0 && classArr.join(" ")) || null} htmlFor={id || name}>
			{label}

			{/* is required */}
			{required === true && <span style={{ marginLeft: "10px" }}>(required)</span>}
		</label>
	);
};

Label.defaultProps = {
	className: null,
	label: null,
	inline: false,
	name: null,
	id: null,
	required: null
};

Label.propTypes = {
	className: PropTypes.string,
	inline: PropTypes.bool,
	label: PropTypes.node,
	name: PropTypes.string,
	id: PropTypes.string,
	required: PropTypes.oneOf([true, false, null])
};

export default Label;
