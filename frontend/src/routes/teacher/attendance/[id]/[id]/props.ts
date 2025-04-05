export interface Props {
	id: string;
	of: string;
	on: string;
	attendance: {
		id: string;
		name: string;
		present: boolean;
	}[];
};
