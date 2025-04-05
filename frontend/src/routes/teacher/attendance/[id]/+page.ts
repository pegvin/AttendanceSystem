import { error } from '@sveltejs/kit';
import { pb } from "$lib/pb.ts";

interface Course {
	id: string;
	name: string;
	code: string;
	programme: string;
	semester: number;
	expand: {
		students: {
			id: string;
			name: string;
		}[];
	};
};

interface Attendance {
	id: string;
	of: string;
	on: string;
	present: string[];
}

interface Props {
	course: Course;
	attendance: Attendance[];
};

/** @type {import('./$types').PageLoad} */
export async function load({ params }) : Promise<{ data: Props }> {
	try {
		const course : Course = await pb.collection("courses").getOne(params.id, {
			fields: "id,name,code,programme,semester,expand.students.id,expand.students.name",
			expand: "students"
		});

		const attendance : Attendance[] = await pb.collection("attendance").getFullList({
			sort: "-on",
			fields: "id,of,on,present"
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
