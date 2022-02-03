interface IInput {
	className?: string | null;
	placeholder?: string;
	type?: string;
	id?: string;
	name: string;
	value: string;
	checked?: boolean;
	disabled?: boolean;
	onChange: (e) => void;
}