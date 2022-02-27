import { useState } from "react";
import uuid from "react-uuid";
import { xml2json } from "../helpers/xml_functions";
import ShowList from "../components/index/ShowList";

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

	const inportFile = () => {
		// init FileReader to import file data
		const reader = new FileReader();

		const onload = function () {
			const xmlString: string | ArrayBuffer = reader.result;

			// Parse xml string into DOM object
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(xmlString.toString(), "text/xml");

			// Convert XML object into JSON
			const xmlJson = xml2json(xmlDoc);

			setData(xmlJson);
		};

		reader.onload = onload;
		reader.readAsText(selectedFile);
	};

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

	const ListingComponent = () => {
		const outputArr = [];

		Object.entries(data).forEach((entry) => {
			const [key, value] = entry;

			outputArr.push(<ShowList key={uuid()} subitems={value} name={key} />);
		});

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
