<!--
  Figma `Composer`: the Ask box, the one bright surface on dark screens.
  States: empty (56 high, pill) and filled (grows to 4 lines, controls
  bottom-aligned, send enabled). No real typing: tapping the box types the
  scripted `script` text in (~1.5 s), then send hands it to `onsend`. With no
  script the box says it's not part of the prototype. The mic is decoration.
-->
<script lang="ts">
	import ArrowUp from '@lucide/svelte/icons/arrow-up';
	import Mic from '@lucide/svelte/icons/mic';
	import { typeInto } from '$lib/motion.svelte';
	import { notInPrototype } from '$lib/toast.svelte';

	let {
		placeholder = 'Ask or search…',
		script,
		onsend,
		onactivate,
		morph = false
	}: {
		placeholder?: string;
		script?: string;
		onsend?: (text: string) => void;
		/** Called when the scripted text starts typing (Home: ab-00 → ab-01). */
		onactivate?: () => void;
		/** Give the typed text the `intent` view-transition name (ab-01 → ab-02). */
		morph?: boolean;
	} = $props();

	let value = $state('');
	let typing = $state(false);
	const filled = $derived(value.length > 0);
	const ready = $derived(filled && !typing);

	async function activate() {
		if (typing || filled) return;
		if (!script) return notInPrototype();
		typing = true;
		onactivate?.();
		await typeInto(script, (v) => (value = v));
		typing = false;
	}

	function send() {
		if (!ready) return;
		const text = value;
		onsend?.(text);
		// When morphing, the text must still be there for the view-transition
		// snapshot; the page is leaving anyway.
		if (!morph) value = '';
	}
</script>

<div
	class={[
		'flex w-full shrink-0 gap-1 bg-composer py-2 pr-2 pl-5 text-composer-foreground transition-[border-radius] duration-300',
		filled ? 'items-end rounded-3xl' : 'h-14 items-center rounded-full'
	]}
	data-state={filled ? 'filled' : 'empty'}
>
	<button
		class="min-w-0 flex-1 cursor-text self-stretch text-left text-body-md"
		aria-label={filled ? undefined : placeholder}
		onclick={activate}
	>
		{#if filled}
			<span class={['line-clamp-4 block py-2', morph && 'vt-intent']}>{value}</span>
		{:else}
			<span class="block truncate text-composer-muted-foreground">{placeholder}</span>
		{/if}
	</button>
	<span class="flex size-10 shrink-0 items-center justify-center" aria-hidden="true">
		<Mic size={20} />
	</span>
	<button
		class={[
			'flex size-10 shrink-0 items-center justify-center rounded-full transition-colors',
			ready
				? 'bg-primary text-primary-foreground'
				: 'bg-composer-muted text-composer-muted-foreground'
		]}
		aria-label="Send"
		disabled={!ready}
		onclick={send}
	>
		<ArrowUp size={20} />
	</button>
</div>
