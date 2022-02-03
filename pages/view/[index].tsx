import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "hooks";
import Label from "components/elements/Label";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import Relation from "components/elements/Relation";
import Message from "components/elements/Message";
import { TYPES } from "constants/";
import { updateStorage } from "state/slices/storageSlice";
import { ucFirst } from "helpers";
import { v4 as uuidv4 } from "uuid";

const EditObject = () => {
	const dispatch = useAppDispatch();
	const storage = useAppSelector((state) => state.storage);
	const router = useRouter();

	const [key, setKey] = useState(null);
	const [source, setSource] = useState("-1");
	const [data, setData] = useState<TStorage>({
		name: "",
		uuid: uuidv4(),
		description: "",
		type: null,
		relations: []
	});
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);

	// get item data from storage
	useEffect(() => {
		if (router.query?.index && storage) {
			const idx = Number(router.query.index);

			// validate index
			if (isNaN(idx)) return;

			// get data from storage
			if (storage && storage[idx] && idx > -1) {
				setData(storage[idx]);
				setKey(idx);
				return;
			}

			// redirect to menu if key does not exist in storage
			if (idx > -1) router.push("/");
		}
	}, [router, storage]);

	const onChangeValue = (field: string, e) => {
		const newData = { ...data };
		newData[field] = e.target.value;

		setData(newData);
	};

	const onChangeSource = (e) => {
		setSource(e.target.value);
	};

	const onAddRelation = () => {
		// no target has been selected
		if (source === "-1") return;

		// skip if target is already in list
		if (data.relations.includes(source)) return;

		// add new relation uuid
		const newRelations = [...data.relations];
		newRelations.push(source);

		// update state
		setData({
			...data,
			relations: newRelations
		});
	};

	const onRemoveRelation = (uuid: string) => {
		// ask for confirmation
		const isConfirm = confirm("Are you sure to delete this relation?");
		if (!isConfirm) return;

		// crop uuid from relations
		const newData = { ...data };
		newData.relations = data.relations.filter((uuid2) => uuid2 !== uuid);

		// update state
		setData(newData);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// validate form fields
		if (validateFields()) return;

		const payload = storage ? [...storage] : [];

		// update existing key
		if (key !== null) payload[key] = data;

		// add new item
		if (key === null) payload.push(data);

		dispatch({ type: updateStorage.type, payload: payload });

		setIsSuccess(true);
	};

	const validateFields = () => {
		let error = false;

		// validate name
		if (!data?.name || data.name.length === 0) {
			setError("Name is a required field");
			error = true;
		}

		// validate radio type
		if (!data?.type) {
			setError("Please select a type");
			error = true;
		}

		return error;
	};

	const Headline = () => {
		if (key === null) return <h1>Add new object</h1>;

		return <h1>Edit object</h1>;
	};

	const Buttons = () => {
		return (
			<div className='row row--buttons'>
				{!isSuccess && (
					<>
						<Button color='green' type='submit' onClick={(e) => onSubmit(e)} label='Save' />
						<Button color='cancel' onClick={() => router.push("/")} label='Cancel' />
					</>
				)}

				{isSuccess && (
					<>
						<Button color='green' onClick={() => router.push("/")} label='Back to main menu' />
					</>
				)}
			</div>
		);
	};

	const SelectTarget = () => {
		if (!storage || storage.length === 0) return null;

		// filter possible relations
		const options = storage.filter((item) => !data.relations.includes(item.uuid) && item.uuid !== data.uuid);

		return (
			<>
				<h2>Relations:</h2>

				{options.length > 0 && (
					<div className='row'>
						<select name='sources' value={source} onChange={(e) => onChangeSource(e)}>
							<option value='-1'>Select a target</option>
							{options.map((item, index) => (
								<option key={`option-` + index} value={item.uuid}>
									{item.name}
								</option>
							))}
						</select>
						<Button color='blue' onClick={onAddRelation} disabled={source === "-1"} label='Add' />
					</div>
				)}
			</>
		);
	};

	const ListRelations = () => {
		if (data.relations.length === 0) return <div>No relations has been created.</div>;

		return (
			<>
				{data.relations.map((uuid, index) => (
					<Relation key={`option-` + index} uuid={uuid} onDelete={onRemoveRelation} />
				))}
			</>
		);
	};

	if (!data && key) return <div>No data found.</div>;

	return (
		<>
			<Headline />

			{isSuccess && <Message color='green'>Data has been succesfully saved.</Message>}

			{!isSuccess && (
				<form>
					<div className='row'>
						<Label label='Name:' id='name' required />
						<Input type='text' name='name' value={data?.name || ""} onChange={(e) => onChangeValue("name", e)} />
					</div>
					<div className='row'>
						<Label label='Description:' id='description' />
						<Input
							type='text'
							name='description'
							value={data?.description || ""}
							onChange={(e) => onChangeValue("description", e)}
						/>
					</div>
					<div className='row'>
						<Label label='Type:' id='type' required />

						{TYPES.map((type, index) => {
							// output radio button for each type
							return (
								<div className='col' key={`radio-` + index}>
									<Input
										type='radio'
										id={`radio-` + index}
										name='type'
										value={type}
										checked={type === data?.type || false}
										onChange={(e) => onChangeValue("type", e)}
									/>
									<Label label={ucFirst(type)} id={`radio-` + index} inline />
								</div>
							);
						})}
					</div>

					<SelectTarget />
					<ListRelations />
				</form>
			)}

			{error && !isSuccess && <Message>Error: {error}</Message>}

			<Buttons />
		</>
	);
};

export default EditObject;
