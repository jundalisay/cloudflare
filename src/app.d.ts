// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	    interface Locals {
				auth: import('@auth/core').Session | null;
	    }
	}
}

export {};
