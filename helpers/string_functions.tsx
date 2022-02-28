// crop \r \n \t from text
export const replaceLineFeeds = (string: string): string => {
	let newString = string.replace(/\r/g, "");
	newString = newString.replace(/\n/g, "");
	newString = newString.replace(/\t/g, "");

	return newString;
};
