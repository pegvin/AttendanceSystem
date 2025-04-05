<script lang="ts">
    import { invalidateAll } from "$app/navigation";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
    import { Separator } from "$lib/components/ui/separator";
	import * as Table from "$lib/components/ui/table";
    import { pb } from "$lib/pb.ts";
    import { LoaderCircle, Trash } from "lucide-svelte";
    import { toast } from "svelte-sonner";
    import SearchSelect from "./search-select.svelte";

	const { data } = $props();

	let IsAdding : boolean = $state(false);
	let IsOpen : boolean = $state(false);
	let CourseData = $state({
			name: "",
			code: "",
			programme: "",
			semester: 1,
			faculty: "",
			students: [""]
	});
	function _ResetCourseData() {
		CourseData = {
			name: "",
			code: "",
			programme: "",
			semester: 1,
			faculty: "",
			students: []
		};
	}
	_ResetCourseData();

	async function OnSubmit(e: Event) : Promise<void> {
		e.preventDefault();
		IsAdding = true;
		try {
			await pb.collection("courses").create({
				name: CourseData.name,
				code: CourseData.code,
				semester: CourseData.semester,
				programme: CourseData.programme,
				faculty: CourseData.faculty,
				students: CourseData.students
			});
			await invalidateAll();
		} catch (e: any) {
			console.error(e);
			toast.error(e.toString());
		}
		_ResetCourseData();
		IsAdding = IsOpen = false;
	}

	let RemovingIndex : number = $state(-1);

	async function OnDelete(i: number) : Promise<void> {
		if (RemovingIndex > -1) {
			return;
		} else {
			RemovingIndex = i;
		}

		try {
			await pb.collection("courses").delete(data.data.courses[RemovingIndex].id);
			await invalidateAll();
		} catch (e: any) {
			console.error(e);
			toast.error(e.toString());
		}

		RemovingIndex = -1;
	}
</script>

<Dialog.Root bind:open={IsOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>Add New Course</Dialog.Trigger>
	<Dialog.Content class="w-fit">
		<Dialog.Header>
			<Dialog.Title>Add New Course</Dialog.Title>
			<Dialog.Description>
				Enter the details here. Click "Add" when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<form onsubmit={OnSubmit}>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="course_name" class="text-right">Course Name</Label>
					<Input id="course_name" class="col-span-3" bind:value={CourseData.name} />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="course_code" class="text-right">Course Code</Label>
					<Input id="course_code" class="col-span-3" bind:value={CourseData.code} />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="course_sem" class="text-right">Semester</Label>
					<Input id="course_sem" class="col-span-3" type="number" min={1} step={1} bind:value={CourseData.semester} />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="course_prog" class="text-right">Programme</Label>
					<Input id="course_prog" class="col-span-3" bind:value={CourseData.programme} />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="course_faculty" class="text-right">Faculty</Label>
					<SearchSelect
						id="course_faculty"
						Placeholder="Choose Faculty..."
						NotFoundPlaceholder="No Faculty Found..."
						Multiple={false}
						Items={data.data.faculty.map((f) => { return { label: `${f.name} (${f.email})`, value: `${f.name} ${f.email}` } })}
						OnSelect={(v) => {
							if (v.length == 0) {
								CourseData.faculty = "";
							} else {
								let id = data.data.faculty.find((f) => {
									return `${f.name} ${f.email}` == v[0];
								})?.id;
								if (id) {
									CourseData.faculty = id;
								}
							}
						}}
					/>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="course_students" class="text-right">Students</Label>
					<SearchSelect
						id="course_students"
						Placeholder="Choose Students..."
						NotFoundPlaceholder="No Student Found..."
						Multiple={true}
						Items={data.data.students.map((s) => { return { label: `${s.name} (${s.email})`, value: `${s.name} ${s.email}` } })}
						OnSelect={(v) => {
							CourseData.students = data.data.students.filter((s) => {
								return v.includes(`${s.name} ${s.email}`);
							}).map((s) => s.id);
						}}
					/>
				</div>
			</div>
			<Dialog.Footer class="self-end">
				<Button type="submit" disabled={IsAdding}>
					{#if IsAdding}
						<LoaderCircle class="animate-spin" />
						Please wait
					{:else}
						Add
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

<Separator class="my-4" />

<Table.Root class="w-fit">
	<Table.Header>
		<Table.Row>
			<Table.Head>Course Name</Table.Head>
			<Table.Head>Course Code</Table.Head>
			<Table.Head>Programme</Table.Head>
			<Table.Head>Semester</Table.Head>
			<Table.Head>Faculty</Table.Head>
			<Table.Head>Actions</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
	{#each data.data.courses as d, i}
		<Table.Row>
			<Table.Cell>{d.name}</Table.Cell>
			<Table.Cell>{d.code}</Table.Cell>
			<Table.Cell>{d.programme}</Table.Cell>
			<Table.Cell>{d.semester}</Table.Cell>
			<Table.Cell>{d.expand.faculty.name}</Table.Cell>
			<Table.Cell onclick={() => OnDelete(i)} class="text-center">
				<Button type="button" variant="outline" size="icon" disabled={RemovingIndex > -1}>
					{#if RemovingIndex > -1}
						<LoaderCircle class="animate-spin" />
					{:else}
						<Trash />
					{/if}
				</Button>
			</Table.Cell>
		</Table.Row>
	{/each}
	</Table.Body>
	<Table.Footer>
		<Table.Row>
			<Table.Cell colspan={5}>Total</Table.Cell>
			<Table.Cell class="text-right">{data.data.courses.length} {data.data.courses.length == 1 ? "Entry" : "Entries"}</Table.Cell>
		</Table.Row>
	</Table.Footer>
</Table.Root>  
