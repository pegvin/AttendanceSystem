<script lang="ts">
	import { Button } from "$lib/components/ui/button";
    import moment from "moment";
    import GoBack from "$lib/goback";
    import { Separator } from "$lib/components/ui/separator";
    import { currentUser } from "$lib/pb";
	import Chart from "chart.js/auto";
    import { onMount } from "svelte";

	const { data: _data } = $props();
	const course = _data.data.course;
	const attendance = _data.data.attendance;

	let chartCanvas : HTMLCanvasElement | null = null;

	onMount(() => {
		if (!chartCanvas) return;

		let data = {
			absent: attendance.length,
			present: 0
		};
		if ($currentUser) {
			data.present = attendance.filter((a) => a.present.includes($currentUser.id)).length;
			data.absent = attendance.length - data.present;
		}

		new Chart(
			chartCanvas,
			{
				type: "pie",
				data: {
					labels: [ "Present", "Absent" ],
					datasets: [
						{
							label: "Classes",
							data: [ data.present, data.absent ],
							backgroundColor: [ "#84cc16", "#ef4444" ]
						}
					]
				},
				options: {
					plugins: {
						title: {
							display: true,
							text: `Out of ${attendance.length} Classes, Present in ${data.present} & Absent in ${data.absent}`,
							position: "bottom",
							align: "center"
						}
					}
				}
			}
		);
	});

	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { type DateValue } from "@internationalized/date";
	import * as Calendar from "$lib/components/ui/calendar";

	function FindClassOn(date: DateValue) {
		const fmt = "DD/MM/YYYY";
		const d = `${("0" + date.day).slice(-2)}/${("0" + date.month).slice(-2)}/${date.year}`;
		let item = attendance.find((v) => {
			return moment(d, fmt).format(fmt) == moment(v.on).format(fmt);
		});
		return item;
	}

	function ColorBasedOnPresent(date: DateValue) {
		if ($currentUser) {
			const c = FindClassOn(date);
			if (c) {
				return c.present.includes($currentUser.id) ? "text-green-400" : "text-red-400";
			}
		}
		return undefined;
	}
</script>

<div class="flex flex-row gap-2">
	<Button variant="outline" onclick={() => GoBack()}>Go Back</Button>
</div>

<div class="my-2 w-full text-center">
	<h1>{course.name} ({course.code})</h1>
</div>

<Separator class="my-4" />

<div class="flex flex-row justify-center w-full">
	<canvas class="mt-2 max-w-80 max-h-80" bind:this={chartCanvas}></canvas>

	<Separator orientation="vertical" class="mx-4" />

	<CalendarPrimitive.Root readonly={true} weekdayFormat="short" type="single" class="mt-2 w-fit h-fit">
		{#snippet children({ months, weekdays })}
			<Calendar.Header class="flex w-full items-center justify-between gap-2">
				<Calendar.PrevButton />
				<Calendar.Heading />
				<Calendar.NextButton />
			</Calendar.Header>
			<Calendar.Months>
				{#each months as month (month)}
					<Calendar.Grid>
						<Calendar.GridHead>
							<Calendar.GridRow class="flex">
								{#each weekdays as weekday (weekday)}
									<Button class="p-2 w-9" disabled={true} variant="ghost">
										{weekday.slice(0, 2)}
									</Button>
								{/each}
							</Calendar.GridRow>
						</Calendar.GridHead>
						<Calendar.GridBody>
							{#each month.weeks as weekDates (weekDates)}
								<Calendar.GridRow class="mt-2 w-full">
									{#each weekDates as date (date)}
										{#if FindClassOn(date)}
											<Calendar.Cell class="select-none" {date} month={month.value}>
												<Button class={`p-2 w-9 ${ColorBasedOnPresent(date)}`} disabled={date.month != month.value.month} variant="ghost">
													{date.day}
												</Button>
											</Calendar.Cell>
										{:else}
											<Calendar.Cell class="select-none" {date} month={month.value}>
												<Button class="p-2 w-9" disabled={date.month != month.value.month} variant="ghost">
													{date.day}
												</Button>
											</Calendar.Cell>
										{/if}
									{/each}
								</Calendar.GridRow>
							{/each}
						</Calendar.GridBody>
					</Calendar.Grid>
				{/each}
			</Calendar.Months>
		{/snippet}
	</CalendarPrimitive.Root>
</div>
