import { FC } from "react";
import { useAppSelector } from "hooks";
import Button from "./Button";
import { ucFirst } from "helpers";

const Relation: FC<{
	uuid: string;
	onDelete: (uuid: string) => void;
}> = ({ uuid, onDelete }): JSX.Element => {
	const storage = useAppSelector((state) => state.storage);

	// get item from storage
	const item = storage.filter((item) => item.uuid === uuid)[0];

	return (
		<div className='item item--relation'>
			<div className='item--left'>
				<div className='item--name'>
					{item.name}, {ucFirst(item.type.toString())}
				</div>
			</div>
			<div className='item--actions'>
				<Button color='red' size='small' onClick={() => onDelete(uuid)} label='Delete' />
			</div>
		</div>
	);
};

export default Relation;
