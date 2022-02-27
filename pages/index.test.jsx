import { render, screen } from "@testing-library/react";
import Main from "./index";

describe("UI tests", () => {
	test("if input field and submit button exist", () => {
		render(<Main />);

		const buttonElement = screen.getByRole("button", {
			name: "Upload"
		});

		const inputElement = screen.getByTestId("input-field");

		expect(buttonElement).toBeInTheDocument();
		expect(inputElement).toBeInTheDocument();
	});

	test("if submit button is disabled on initial load", () => {
		render(<Main />);

		const buttonElement = screen.getByRole("button", {
			name: "Upload"
		});

		expect(buttonElement).toBeDisabled();
	});
});
