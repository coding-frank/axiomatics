type TType = "desk" | "computer" | "keyboard" | "server" | "human";

type TStorage = {
	name: string;
	uuid: string;
	description: string | null;
	type: keyof typeof TType;
	relations: string[] | null;
};