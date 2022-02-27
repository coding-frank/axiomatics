import ShowListItem from "./ShowListItem";
import uuid from "react-uuid";
import { replaceLineFeeds } from "../../helpers/string_functions";

const ShowList = ({ subitems, name }) => {
	const outputSubArr = [];

	if (subitems) {
		Object.entries(subitems).forEach((entry) => {
			const [key, value] = entry;

			switch (typeof value) {
				case "string":
					outputSubArr.push(<ShowListItem key={uuid()} value={replaceLineFeeds(value)} name={key} />);
					break;
				case "object":
					outputSubArr.push(<ShowList key={uuid()} subitems={value} name={key} />);
					break;
			}
		});
	}

	return (
		<li key={uuid()}>
			<span>{name}:</span>
			{outputSubArr && <ul className='tree-list'>{outputSubArr}</ul>}
		</li>
	);
};

export default ShowList;
