<script lang="ts">
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import * as Table from "$lib/components/ui/table";
    import { Eye, LoaderCircle, Trash } from "lucide-svelte";
    import moment from "moment";
    import GoBack from "$lib/goback";
    import { Separator } from "$lib/components/ui/separator";
    import { pb } from "$lib/pb";
    import { goto, invalidateAll } from "$app/navigation";
    import { toast } from "svelte-sonner";
	import * as Dialog from "$lib/components/ui/dialog";
    import DatePicker from "./date-picker.svelte";

	const { data } = $props();

	let RemovingId : string = $state("");

	async function OnDelete(id: string) : Promise<void> {
		if (RemovingId) {
			return;
		} else {
			RemovingId = id;
		}

		try {
			await pb.collection("attendance").delete(RemovingId);
			await invalidateAll();
			toast.success("Deleted");
		} catch (e: any) {
			console.error(e);
			toast.error(e.toString());
		}

		RemovingId = "";
	}

	let IsAdding : boolean = $state(false);
	let IsOpen : boolean = $state(false);
	let date : string = $state("");

	async function OnSubmit() : Promise<void> {
		IsAdding = true;
		try {
			const record = await pb.collection("attendance").create({
				of: data.data.course.id,
				on: date,
				present: []
			});
			goto(`${window.location.pathname}/${record.id}`);
		} catch (e: any) {
			console.error(e);
			toast.error(e.toString());
		}
		date = "";
		IsAdding = IsOpen = false;
	}
</script>

<div class="flex flex-row gap-2">
	<Button variant="outline" onclick={() => GoBack()}>Go Back</Button>
	<Dialog.Root bind:open={IsOpen}>
		<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>Take Attendance</Dialog.Trigger>
		<Dialog.Content class="w-fit">
			<Dialog.Header>
				<Dialog.Title>Take Attendance</Dialog.Title>
				<Dialog.Description>
					Select date. Click "Add" when you're done.
				</Dialog.Description>
			</Dialog.Header>
			<div>
				<DatePicker OnSelect={(v) => date = v} />
			</div>
			<Dialog.Footer class="self-end">
				<Button onclick={OnSubmit} type="submit" disabled={(!date || IsAdding) ? true : false}>
					{#if IsAdding}
						<LoaderCircle class="animate-spin" />
						Please wait
					{:else}
						Add
					{/if}
				</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</div>

<Separator class="my-4" />

<Table.Root class="w-fit">
	<Table.Header>
		<Table.Row>
			<Table.Head>Date</Table.Head>
			<Table.Head>Attendees</Table.Head>
			<Table.Head colspan={2} class="text-center">Actions</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
	{#each data.data.attendance as a, i}
		<Table.Row>
			<Table.Cell>{moment(a.on).format("DD/MM/YYYY")}</Table.Cell>
			<Table.Cell>{a.present.length}/{data.data.course.expand.students.length}</Table.Cell>
			<Table.Cell class="text-center">
				<Button href={`/teacher/attendance/${data.data.course.id}/${a.id}`} type="button" variant="outline" size="icon">
					<Eye />
				</Button>
			</Table.Cell>
			<Table.Cell class="text-center">
				<Button onclick={() => OnDelete(a.id)} disabled={RemovingId ? true : false} type="button" variant="outline" size="icon">
					{#if RemovingId && RemovingId == a.id}
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
			<Table.Cell colspan={3}>Total</Table.Cell>
			<Table.Cell class="text-right">{data.data.attendance.length} {data.data.attendance.length == 1 ? "Entry" : "Entries"}</Table.Cell>
		</Table.Row>
	</Table.Footer>
</Table.Root>
