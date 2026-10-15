// One short message at a time, shown inside the phone frame (Toast.svelte).
// Used for the parts the prototype doesn't cover (prototype-spec.md › Not prototyped).

class Toaster {
	message = $state<string | null>(null);
	#timer: ReturnType<typeof setTimeout> | undefined;

	show(message: string, duration = 1800) {
		clearTimeout(this.#timer);
		this.message = message;
		this.#timer = setTimeout(() => (this.message = null), duration);
	}
}

export const toast = new Toaster();
export const notInPrototype = () => toast.show('Not in this prototype');
