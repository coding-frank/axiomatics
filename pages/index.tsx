import { useState } from "react";
import XMLParser from "xml-parser-xo";
import uuid from "react-uuid";

function Main() {
	const [selectedFile, setSelectedFile] = useState<Blob | null>(null);
	const [data, setData] = useState(null);
	const [error, setError] = useState<string | null>(null);

	const submitForm = (event) => {
		event.preventDefault();

		// check for existing file name
		if (!selectedFile) return;

		inportFile();
	};

	// crop \r \n \t from text
	const replaceLineFeeds = (string: string) => {
		console.log("string: ", string);
		let newString = string.replace(/\r/g, "");
		newString = newString.replace(/\n/g, "");
		newString = newString.replace(/\t/g, "");

		return newString;
	};

	const inportFile = () => {
		// init FileReader to import file data
		const reader = new FileReader();

		const onload = function () {
			const text: string | ArrayBuffer = reader.result;

			const xmlParsed = XMLParser(text);

			// take children from xml file only
			const children = xmlParsed.children;

			// set parsed xml to state
			setData(children);
		};

		reader.onload = onload;
		reader.readAsText(selectedFile);
	};

	console.log("data", data);
	const handleChange = (e) => {
		// check for file
		if (e.target.files.length === 0) return;

		// check file extension
		if (e.target.files[0].type !== "text/xml") {
			setSelectedFile(null);
			setError("Please upload a XML file.");
			return;
		}

		setSelectedFile(e.target.files[0]);
		setError(null);
	};

	const ShowList = ({ subitems, name }) => {
		return (
			<li key={uuid()}>
				{name}
				<ul className='tree-list'>
					{subitems
						.filter((sub) => sub.content !== "")
						.map((item) => {
							if (item.children) {
								return <ShowList key={uuid()} subitems={item.children} name={item.name} />;
							}

							if (!item.children) {
								return <ShowListItem key={uuid()} item={item} />;
							}
						})}
				</ul>
			</li>
		);
	};

	const ShowListItem = ({ item }) => {
		if (item.type === "Element") return <li>{item.name}</li>;
		if (item.type === "Text") {
			const clearedContent = replaceLineFeeds(item.content);

			return clearedContent.length > 0 ? <li>{clearedContent}</li> : null;
		}

		return null;
	};

	const ListingComponent = () => {
		const outputArr = [];

		// loop though data and build output array
		for (let i = 0; i < data.length; i++) {
			if (data[0].children) {
				outputArr.push(<ShowList key={uuid()} subitems={data[0].children} name={data[0].name} />);
			}

			if (!data[0].children) {
				outputArr.push(<ShowListItem key={uuid()} item={data[0]} />);
			}
		}

		return <ul className='tree-list'>{outputArr}</ul>;
	};

	return (
		<>
			<h1>XML Upload Demo</h1>

			{!data && (
				<form>
					<div className='search'>
						<input type='file' data-testid='input-field' name='example' accept='.xml' onChange={handleChange} />
						<button
							type='button'
							className='btn btn--blue'
							onClick={submitForm}
							disabled={!selectedFile || error ? true : false}
						>
							Upload
						</button>

						{error && <div className='error'>{error}</div>}
					</div>
				</form>
			)}

			{data && <ListingComponent />}
		</>
	);
}

export default Main;
