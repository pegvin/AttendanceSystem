import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { pb, currentUser } from "$lib/pb.ts";
import type { AuthRecord } from 'pocketbase';

interface Props {
	id: string;
	name: string;
	code: string;
	programme: string;
	semester: number;
};

/** @type {import('./$types').PageLoad} */
export async function load({ params }) : Promise<{ data: Props[] }> {
	try {
		let user: AuthRecord = get(currentUser);

		if (!user) {
			throw new Error("Failed to get user!");
		}

		const records : Props[] = await pb.collection("courses").getFullList({
			sort: "-name",
			fields: "id,name,code,programme,semester",
			filter: `faculty = "${user.id}"`
		});

		return {
			data: records
		};
	} catch (e) {
		error(500, "Internal Error");
	}
}
