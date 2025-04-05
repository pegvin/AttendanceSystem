<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		today
	} from "@internationalized/date";
	import { cn } from "$lib/utils";
	import { Button, type Props as ButtonProps } from "$lib/components/ui/button";
	import { Calendar } from "$lib/components/ui/calendar";
	import * as Popover from "$lib/components/ui/popover";
    import { onMount } from "svelte";

	type Props = {
		OnSelect?: (date: string) => void;
	};

	const { OnSelect = () => {} } : Props = $props();

	const df = new DateFormatter("en-US", {
		dateStyle: "long"
	});

	let value: DateValue | undefined = $state(today(getLocalTimeZone()));

	onMount(() => {
		onValueChange(value);
	})

	function onValueChange(v: DateValue | undefined) : void {
		value = v;
		if (v) {
			OnSelect(`${v.year}-${("0" + v.month).slice(-2)}-${("0" + v.day).slice(-2)} 00:00:00.000Z`);
		} else {
			OnSelect("");
		}
	}
</script>

<Popover.Root>
	<Popover.Trigger>
		<Button
			variant="outline"
			class={cn(
				"justify-start text-left font-normal",
				!value && "text-muted-foreground"
			)}
		>
			<CalendarIcon />
			{value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" align="start">
		<Calendar type="single" bind:value={value} onValueChange={onValueChange} />
	</Popover.Content>
</Popover.Root>
