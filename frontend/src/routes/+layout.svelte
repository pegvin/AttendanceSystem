<script lang="ts">
	import "../app.css";
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import { pb, currentUser } from "$lib/pb.ts";
	import { page } from "$app/state";
	import { Toaster } from "$lib/components/ui/sonner/index.ts";
	import { ModeWatcher, mode } from "mode-watcher";
	import * as Sidebar from "$lib/components/ui/sidebar/index.ts";
	import AppSidebar from "./sidebar.svelte";

	let { children } = $props();
	
	if (browser) {
	    // Validate Auth Token
	    if ($currentUser) {
	        pb.collection($currentUser.collectionName).authRefresh()
	            .catch(e => {
	                pb.authStore.clear();
	            });
	    }
	    $effect(() => {
	        if (!$currentUser && page.route.id != "/") {
	            goto("/", { replaceState: true, invalidateAll: true });
	        }
	    })
	}
</script>

<ModeWatcher />
<Toaster richColors theme={$mode} />

{#if $currentUser}
	<Sidebar.Provider open={true}>
		<AppSidebar />
		<Sidebar.Trigger class="px-2 py-5" />
		<div class="flex flex-col h-screen w-full items-start justify-start p-4">
			{@render children?.()}
		</div>
	</Sidebar.Provider>
{:else}
	{@render children?.()}
{/if}
