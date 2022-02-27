const ShowListItem = ({ value, name }) => {
	if (value.length === 0) return null;

	return (
		<li>
			<span>{name}:</span> {value}
		</li>
	);
};

export default ShowListItem;
