// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	// https://github.com/sveltejs/svelte/issues/13837#issuecomment-2433355842
	namespace $state {
		type MyPrimitive = string | number | boolean | null | undefined | Promise;

		type MySnapshot<T> = T extends MyPrimitive
			? T
			: T extends Cloneable
				? NonReactive<T>
				: T extends { toJSON(): infer R }
					? R
					: T extends Array<infer U>
						? Array<Snapshot<U>>
						: T extends object
							? T extends { [key: string]: unknown }
								? { [K in keyof T]: Snapshot<T[K]> }
								: never
							: never;

		export function snapshot<T>(state: T): MySnapshot<T>;
	}
}

export {};
