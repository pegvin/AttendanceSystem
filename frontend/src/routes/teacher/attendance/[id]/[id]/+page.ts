import { error } from '@sveltejs/kit';
import { pb } from "$lib/pb.ts";
import type { Props } from './props';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) : Promise<{ data: Props }> {
	try {
		interface Attendance {
			of: string;
			on: string;
			expand: {
				present: {
					id: string;
					name: string;
				}[];
			};
		};
		const attendance : Attendance = await pb.collection("attendance").getOne(params.id,
			{
				fields: "of,on,expand.present.id,expand.present.name",
				expand: "present"
			}
		);

		interface Student {
			id: string;
			name: string;
		};
		const students : Student[] = (await pb.collection("courses").getOne(attendance.of, {
			fields: "semester,expand.students.id,expand.students.name",
			expand: "students"
		}))?.expand?.students;

		return {
			data: {
				id: params.id,
				of: attendance.of,
				on: attendance.on,
				attendance: students.map((s) => {
					return {
						id: s.id,
						name: s.name,
						present: attendance?.expand?.present?.map((s) => s.id).includes(s.id) || false
					};
				})
			}
		};
	} catch (e) {
		console.error(e);
		error(500, "Internal Error");
	}
}
