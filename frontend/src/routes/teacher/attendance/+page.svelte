<script lang="ts">
    import { Button } from "$lib/components/ui/button";
	import * as Table from "$lib/components/ui/table";
    import { Eye } from "lucide-svelte";
    import GoBack from "$lib/goback";
    import { Separator } from "$lib/components/ui/separator";

	const { data } = $props();
</script>

<div class="flex flex-row gap-2">
	<Button variant="outline" onclick={() => GoBack(2)}>Go Back</Button>
</div>

<Separator class="my-4" />

<Table.Root class="w-fit">
	<Table.Header>
		<Table.Row>
			<Table.Head>Course Name</Table.Head>
			<Table.Head>Course Code</Table.Head>
			<Table.Head>Programme</Table.Head>
			<Table.Head>Semester</Table.Head>
			<Table.Head class="text-center">Actions</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
	{#each data.data as d, i}
		<Table.Row>
			<Table.Cell>{d.name}</Table.Cell>
			<Table.Cell>{d.code}</Table.Cell>
			<Table.Cell>{d.programme}</Table.Cell>
			<Table.Cell>{d.semester}</Table.Cell>
			<Table.Cell class="text-center">
				<Button href={`/teacher/attendance/${d.id}`} type="button" variant="outline" size="icon">
					<Eye />
				</Button>
			</Table.Cell>
		</Table.Row>
	{/each}
	</Table.Body>
	<Table.Footer>
		<Table.Row>
			<Table.Cell colspan={4}>Total</Table.Cell>
			<Table.Cell class="text-right">{data.data.length} {data.data.length == 1 ? "Entry" : "Entries"}</Table.Cell>
		</Table.Row>
	</Table.Footer>
</Table.Root>
