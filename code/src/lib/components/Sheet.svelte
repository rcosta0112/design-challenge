<!--
  Bottom sheet over the thread (ab-04, ab-05). Not shadcn's Sheet: that one
  portals to <body>, which would escape the desktop phone frame. Slides up
  300 ms ease-out and dims the thread (prototype-spec.md › Flow).
  Open/close goes through shallow routing on the page, so the browser's Back
  closes the sheet.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { DURATION, EASE, ms } from '$lib/motion.svelte';

	let {
		open,
		label,
		onclose,
		children
	}: { open: boolean; label: string; onclose: () => void; children: Snippet } = $props();
</script>

<svelte:window onkeydown={(e) => open && e.key === 'Escape' && onclose()} />

{#if open}
	<button
		class="absolute inset-0 z-40 cursor-default bg-overlay"
		aria-label="Close"
		tabindex="-1"
		onclick={onclose}
		transition:fade={{ duration: ms(DURATION.fade) }}
	></button>
	<div
		role="dialog"
		aria-modal="true"
		aria-label={label}
		class="absolute inset-x-0 bottom-0 z-50 flex max-h-[92%] flex-col rounded-t-xl bg-sheet pb-[env(safe-area-inset-bottom)]"
		in:fly={{ y: '100%', opacity: 1, duration: ms(DURATION.sheet), easing: EASE.out }}
		out:fly={{ y: '100%', opacity: 1, duration: ms(DURATION.sheet * 0.8), easing: EASE.in }}
	>
		<div class="mx-auto mt-2 h-1 w-9 rounded-full bg-muted" aria-hidden="true"></div>
		{@render children()}
	</div>
{/if}
