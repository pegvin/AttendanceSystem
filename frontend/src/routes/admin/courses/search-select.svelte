<script lang="ts">
    import { Check, ChevronsUpDown } from "lucide-svelte";
    import * as Command from "$lib/components/ui/command";
    import * as Popover from "$lib/components/ui/popover";
    import { tick } from "svelte";
    import { Button } from "$lib/components/ui/button";

	interface Item {
		label: string;
		value: string;
	};
	interface Props {
		id: string | undefined;
		Items: Item[];
		Placeholder: string;
		NotFoundPlaceholder: string;
		Multiple: boolean;
		OnSelect?: (values: string[]) => void;
	};

	let {
		id,
		Items,
		Placeholder,
		NotFoundPlaceholder,
		Multiple,
		OnSelect = (v) => {}
	} : Props = $props();

	let open = $state(false);
	let values : string[] = $state([]);
	let triggerRef = $state<HTMLButtonElement>(null!);

	const selectedValue = $derived(
		Items.find((f) => f.value === values[0])?.label ?? Placeholder
	);

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}

	function _OnSelect(v: string) {
		const i = values.indexOf(v);
		if (i > -1) { // If Exists, Just Remove It.
			values.splice(i, 1);
		} else if (Multiple) { // If Doesn't Exist & Multiple Is Allowed Just Push It.
			values.push(v);
		} else { // If Doesn't Exist & Multiple Isn't Allowed, Just Set The Value To It.
			values = [v];
		}

		closeAndFocusTrigger();
		OnSelect(values);
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger id={id} bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class="w-fit justify-between"
				{...props}
				role="combobox"
				aria-expanded={open}
			>
				{selectedValue || Placeholder}
				<ChevronsUpDown class="opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-fit p-0">
		<Command.Root>
			<Command.Input placeholder={Placeholder} class="h-9" />
			<Command.List>
				<Command.Empty>{NotFoundPlaceholder}</Command.Empty>
				<Command.Group>
					{#each Items as item}
						<Command.Item value={item.value} onSelect={() => { _OnSelect(item.value); }}>
							<Check class={values.indexOf(item.value) < 0 ? "text-transparent" : ""} />
							{item.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>