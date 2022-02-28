import { FC } from "react";

const ShowListItem: FC<IListItem> = ({ value, name }): JSX.Element => {
	if (value.length === 0) return null;

	return (
		<li>
			<span>{name}:</span> {value}
		</li>
	);
};

export default ShowListItem;
