import { error } from '@sveltejs/kit';
import { pb } from "$lib/pb.ts";

interface Props {
	id: string;
	email: string;
	name: string;
	role: string;
};

/** @type {import('./$types').PageLoad} */
export async function load({ params }) : Promise<{ data: Props[] }> {
	try {
		const records : Props[] = await pb.collection("users").getFullList({
			sort: "-name",
			fields: "id,email,name,role",
			filter: 'role = "student"',
		});

		return {
			data: records
		};
	} catch (e) {
		error(500, "Internal Error");
	}
}
