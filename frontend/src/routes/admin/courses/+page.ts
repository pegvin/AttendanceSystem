import { error } from '@sveltejs/kit';
import { pb } from "$lib/pb.ts";

interface Course {
	id: string;
	name: string;
	code: string;
	semester: number;
	programme: string;
	expand: {
		faculty: {
			name: string;
		};
	};
};

interface User {
	id: string;
	name: string;
	email: string;
}

/** @type {import('./$types').PageLoad} */
export async function load({ params }) : Promise<{ data: { faculty: User[]; students: User[]; courses: Course[] } }> {
	try {
		const faculty : User[] = await pb.collection("users").getFullList({
			sort: "-name",
			fields: "id,name,email",
			filter: "role = 'teacher'"
		});
		const students : User[] = await pb.collection("users").getFullList({
			sort: "-name",
			fields: "id,name,email",
			filter: "role = 'student'"
		});
		const courses : Course[] = await pb.collection("courses").getFullList({
			sort: "-name",
			fields: "id,name,code,semester,programme,expand.faculty.name",
			expand: "faculty"
		});

		return {
			data: {
				faculty: faculty,
				students: students,
				courses: courses
			}
		};
	} catch (e) {
		error(500, "Internal Error");
	}
}
