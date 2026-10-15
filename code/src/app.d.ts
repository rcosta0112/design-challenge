// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		// Shallow-routing state: which sheet is open over /plan, so Back closes it.
		interface PageState {
			sheet?: 'adjust' | 'review';
		}
	}
}

export {};
