interface IButton {
	color?: string;
	label?: string;
	className?: string;
    disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
	size?: 'small' | 'normal';
}