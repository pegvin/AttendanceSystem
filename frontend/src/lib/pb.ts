import PocketBase from "pocketbase";
import { writable } from "svelte/store";

export const pb = new PocketBase("http://localhost:8090");
export const currentUser = writable(pb.authStore.record);

pb.authStore.onChange((auth) => {
	currentUser.set(pb.authStore.record);
});
