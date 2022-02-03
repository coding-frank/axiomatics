import { useState } from "react";
import { useAppSelector } from "../hooks";
import { useRouter } from "next/router";
import Item from "components/elements/Item";
import Button from "components/elements/Button";
import Input from "components/elements/Input";

function Main() {
	const router = useRouter();
	const storage = useAppSelector((state) => state.storage);

	const [input, setInput] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	const onChange = (e) => {
		// update search
		setInput(e.target.value);

		// get suggestions list
		if (e.target.value.length > 2 && storage) {
			const inputLowered = e.target.value.toLowerCase();
			const results = storage.filter(
				(items) =>
					items.name.toLowerCase().includes(inputLowered) || items.description.toLowerCase().includes(inputLowered)
			);
			setSuggestions(results);
		}
	};

	const ShowSuggestionList = () => {
		// empty storage
		if (!storage || storage.length === 0) return <div>Storage is empty.</div>;

		// show complete storage if user input is empty
		if (storage && input.length === 0) {
			return (
				<div>
					{Object.values(storage).map((item, index) => (
						<Item key={`item-` + index} idx={index} item={item} />
					))}
				</div>
			);
		}

		// no suggestions found
		if (suggestions.length === 0) return <div>No results.</div>;

		// show suggestions
		return (
			<div>
				<p>{suggestions.length} result(s) found:</p>

				{suggestions.map((item, index) => (
					<Item key={`item-` + index} idx={index} item={item} />
				))}
			</div>
		);
	};

	return (
		<>
			<h1>Object Management System</h1>

			<div className='search'>
				<Input
					type='text'
					name='search'
					placeholder='Search by name or description'
					value={input}
					onChange={(e) => onChange(e)}
				/>
				<Button color='blue' onClick={() => router.push("/view/-1")} label='Add' />
			</div>

			{input.length > 0 && (
				<p className='subline'>
					<a href='#' onClick={() => setInput("")}>
						Clear search
					</a>
				</p>
			)}

			<section>
				<ShowSuggestionList />
			</section>
		</>
	);
}

export default Main;
