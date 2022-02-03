import { useState } from "react";
import XMLParser from "xml-parser-xo";

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
			const text: string | ArrayBuffer = reader.result;

			const xmlParsed = XMLParser(text);
			console.log(xmlParsed);

			// set parsed xml to state
			setData(xmlParsed);
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

	return (
		<>
			<h1>XML Upload Demo</h1>

			{!data && (
				<form>
					<div className='search'>
						<input type='file' name='example' accept='.xml' onChange={handleChange} />
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

			{data && <section>show</section>}
		</>
	);
}

export default Main;
