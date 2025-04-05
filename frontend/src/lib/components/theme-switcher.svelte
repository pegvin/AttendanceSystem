<script>
	import { resetMode, setMode, mode } from "mode-watcher";
	import { buttonVariants } from "$lib/components/ui/button/index.ts";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.ts";
	import { Sun, Moon } from "lucide-svelte";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: "outline" })}>
		{#if $mode == "light"}
			<Sun />
		{:else}
			<Moon />
		{/if}
		Theme
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item onclick={() => setMode("light")}>Light</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => setMode("dark")}>Dark</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
