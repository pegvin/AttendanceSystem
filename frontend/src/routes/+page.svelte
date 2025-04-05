<script lang="ts">
	import { pb, currentUser } from "$lib/pb.ts";
	import { toast } from "svelte-sonner";
	import { Button } from "$lib/components/ui/button/index.ts";
	import { Input } from "$lib/components/ui/input/index.ts";
	import { Label } from "$lib/components/ui/label/index.ts";
	import * as Card from "$lib/components/ui/card/index.ts";
	import LoaderCircle from "lucide-svelte/icons/loader-circle";

	let email: string = $state("");
	let passw: string = $state("");
	let isLoggingIn = $state(false);

	async function Login() : Promise<void> {
		isLoggingIn = true;

		try {
			if (!email || !passw) {
				throw new Error("Invalid login details!");
			}

			await pb.collection("users").authWithPassword(email, passw);
		} catch (e: any) {
			toast.error(e.toString());
		}

		isLoggingIn = false;
	}
</script>

<div class="flex flex-col h-screen w-full items-center justify-center">
	{#if $currentUser}
		<h1 class="text-2xl">Welcome To Attendance Portal</h1>
		<p class="mt-2">You're logged in as {$currentUser.name}</p>
	{:else}
		<Card.Root class="mx-auto max-w-sm">
			<Card.Header>
				<Card.Title class="text-2xl">Login</Card.Title>
				<Card.Description>Enter your email below to login to your account</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="grid gap-4">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input bind:value={email} id="email" type="email" placeholder="user@example.com" required />
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Password</Label>
						</div>
						<Input bind:value={passw} id="password" type="password" required />
					</div>
					{#if isLoggingIn}
						<Button class="w-full" type="submit" disabled>
							<LoaderCircle class="animate-spin" />
							Please wait
						</Button>
					{:else}
						<Button class="w-full" type="submit" onclick={Login}>Login</Button>
					{/if}
				</div>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
