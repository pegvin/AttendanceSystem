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

	const { data } = $props();

	let IsAdding : boolean = $state(false);
	let IsOpen : boolean = $state(false);
	let name  : string = $state("");
	let email : string = $state("");
	let passw : string = $state("");

	async function OnSubmit(e: Event) : Promise<void> {
		e.preventDefault();
		IsAdding = true;
		try {
			await pb.collection("users").create({
				email: email,
				emailVisibility: true,
				password: passw,
				passwordConfirm: passw,
				verified: false,
				name: name,
				attendance: null,
				role: "student"
			});
			await invalidateAll();
		} catch (e: any) {
			console.error(e);
			toast.error(e.toString());
		}
		email = passw = name = "";
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
			await pb.collection("users").delete(data.data[RemovingIndex].id);
			await invalidateAll();
		} catch (e: any) {
			console.error(e);
			toast.error(e.toString());
		}

		RemovingIndex = -1;
	}
</script>

<Dialog.Root bind:open={IsOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>Add New Student</Dialog.Trigger>
	<Dialog.Content class="w-fit">
		<Dialog.Header>
			<Dialog.Title>Add New Student</Dialog.Title>
			<Dialog.Description>
				Enter the details here. Click "Add" when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<form onsubmit={OnSubmit}>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">Name</Label>
					<Input id="name" class="col-span-3" bind:value={name} />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="username" class="text-right">Email</Label>
					<Input id="username" class="col-span-3" bind:value={email} />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="password" class="text-right">Password</Label>
					<Input id="password" class="col-span-3" bind:value={passw} />
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
			<Table.Head>Name</Table.Head>
			<Table.Head>Email</Table.Head>
			<Table.Head class="text-center">Actions</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
	{#each data.data as d, i}
		<Table.Row>
			<Table.Cell>{d.name}</Table.Cell>
			<Table.Cell>{d.email}</Table.Cell>
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
			<Table.Cell colspan={2}>Total</Table.Cell>
			<Table.Cell class="text-right">{data.data.length} {data.data.length == 1 ? "Entry" : "Entries"}</Table.Cell>
		</Table.Row>
	</Table.Footer>
</Table.Root>  
