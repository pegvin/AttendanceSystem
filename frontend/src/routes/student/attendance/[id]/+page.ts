import { error } from '@sveltejs/kit';
import { pb } from "$lib/pb.ts";

interface Attendance {
	id: string;
	of: string;
	on: string;
	present: string[];
};

interface Course {
	code: string;
	name: string;
	programme: string;
}

interface Props {
	course: Course;
	attendance: Attendance[];
};

/** @type {import('./$types').PageLoad} */
export async function load({ params }) : Promise<{ data: Props }> {
	try {
		const course : Course = await pb.collection("courses").getOne(
			params.id,
			{
				fields: "code,name,programme"
			}
		);
		const attendance : Attendance[] = await pb.collection("attendance").getFullList({
			sort: "-on",
			fields: "id,of,on,present",
			filter: `of = "${params.id}"`
		});

		return {
			data: {
				course: course,
				attendance: attendance
			}
		};
	} catch (e) {
		error(500, "Internal Error");
	}
}
