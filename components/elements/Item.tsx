import { FC } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "hooks";
import { updateStorage } from "state/slices/storageSlice";
import Button from "./Button";
import Badge from "./Badge";

const Item: FC<{
	item: TStorage;
	idx: number;
}> = ({ item, idx }): JSX.Element => {
	const router = useRouter();
	const storage = useAppSelector((state) => state.storage);
	const dispatch = useAppDispatch();

	const onDelete = (key: number) => {
		// ask for confirmation
		const isConfirm = confirm("Are you sure to delete this object?");
		if (!isConfirm) return;

		const payload = storage.filter((_, index) => index !== key);
		dispatch({ type: updateStorage.type, payload: payload });
	};

	const Relations = () => {
		if (item.relations.length === 0) return <span>no relations</span>;

		// replace uuid with item name
		const relations = item.relations.map((uuid) => storage.filter((item2) => item2.uuid === uuid)[0]["name"]);

		return (
			<>
				{relations.map((name, index) => (
					<Badge key={`badge-` + index} label={name} />
				))}
			</>
		);
	};

	return (
		<div className='item'>
			<div className='item--left'>
				<div className='item--name'>
					{item.name} ({item.type})
				</div>
				<div className='item--description'>Description: {item.description}</div>
				<div className='item--relations'>
					Relations: <Relations />
				</div>
			</div>
			<div className='item--actions'>
				<Button color='grey' size='small' onClick={() => router.push(`/view/${idx}`)} label='Edit' />
				<Button color='red' size='small' onClick={() => onDelete(idx)} label='Delete' />
			</div>
		</div>
	);
};

export default Item;
