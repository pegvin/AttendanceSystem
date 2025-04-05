<script lang="ts">
    import * as Table from "$lib/components/ui/table";
	import { Checkbox } from "$lib/components/ui/checkbox";
    import { Separator } from "$lib/components/ui/separator";
    import { Button } from "$lib/components/ui/button";
	import { toast } from "svelte-sonner";
    import { pb } from "$lib/pb";
    import { invalidateAll } from "$app/navigation";
    import GoBack from "$lib/goback";
    import { LoaderCircle } from "lucide-svelte";
    import type { Props } from "./props";

	const { data } = $props();
	let d : Props = $state(structuredClone($state.snapshot(data.data)));

	let isSaving = $state(false);

	async function OnSave() : Promise<void> {
		isSaving = true;
		try {
			await pb.collection("attendance").update(
				d.id,
				{
					of: d.of,
					on: d.on,
					present: d.attendance.filter(v => v.present).map((v) => {
						return v.id;
					})
				}
			);
			await invalidateAll();
			toast.success("Saved!");
		} catch (e: any) {
			console.error(e);
			toast.error(e.toString());
		}
		// Manually Trigger Re-Assignment As Svelte Isn't Smart Enough Yet
		d = structuredClone($state.snapshot(data.data));
		isSaving = false;
	}
</script>

<div class="flex flex-row gap-2">
	<Button variant="outline" onclick={() => GoBack()}>Go Back</Button>
	<Button variant="outline" onclick={OnSave}>
		{#if isSaving}
			<LoaderCircle class="animate-spin" />
			Please wait
		{:else}
			Save
		{/if}
	</Button>
</div>

<Separator class="my-4" />

<Table.Root class="w-fit">
	<Table.Header>
		<Table.Row>
			<Table.Head class="text-center">Present</Table.Head>
			<Table.Head>Name</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
	{#each d.attendance as a}
		<Table.Row>
			<Table.Cell class="text-center">
				<Checkbox bind:checked={a.present} />
			</Table.Cell>
			<Table.Cell>{a.name}</Table.Cell>
		</Table.Row>
	{/each}
	</Table.Body>
	<Table.Footer>
		<Table.Row>
			<Table.Cell colspan={1}>Total</Table.Cell>
			<Table.Cell class="text-right">{d.attendance.filter((v) => v.present).length}/{d.attendance.length} Present</Table.Cell>
		</Table.Row>
	</Table.Footer>
</Table.Root>

