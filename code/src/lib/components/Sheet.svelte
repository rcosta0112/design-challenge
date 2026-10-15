<!--
  The sheet pattern from Figma board `14.sheet`: overlay → color/sheet surface
  12 px below the status bar, top radius radius/xl → SheetHeader (handle,
  title, optional "Done") → scrolling body → pinned footer. Not shadcn's
  Sheet: that one portals to <body>, which would escape the desktop phone
  frame. Slides up 300 ms ease-out and dims the thread (prototype-spec.md).
  Open/close goes through shallow routing on the page, so Back closes it.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { DURATION, EASE, ms } from '$lib/motion.svelte';

	let {
		open,
		title,
		done,
		onclose,
		children,
		footer,
		overlay
	}: {
		open: boolean;
		title: string;
		/** Show the "Done" action in the header. */
		done?: () => void;
		onclose: () => void;
		children: Snippet;
		footer?: Snippet;
		/** Drawn over the sheet, e.g. the Face ID prompt. */
		overlay?: Snippet;
	} = $props();
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
		aria-label={title}
		class="absolute inset-x-0 top-[calc(var(--safe-top)+12px)] bottom-0 z-50 flex flex-col overflow-hidden rounded-t-3xl bg-popover"
		in:fly={{ y: '100%', opacity: 1, duration: ms(DURATION.sheet), easing: EASE.out }}
		out:fly={{ y: '100%', opacity: 1, duration: ms(DURATION.sheet * 0.8), easing: EASE.in }}
	>
		<header class="flex shrink-0 flex-col items-center gap-3 py-2">
			<span class="h-[5px] w-9 rounded-full bg-muted-foreground/50" aria-hidden="true"></span>
			<div class="flex h-11 w-full items-center justify-between px-6">
				<h2 class="text-heading-sm">{title}</h2>
				{#if done}
					<button class="-mr-2 px-2 py-2.5 text-label-md" onclick={done}>Done</button>
				{/if}
			</div>
		</header>
		<div class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-6 pt-2 pb-3">
			{@render children()}
		</div>
		{#if footer}
			<footer class="flex shrink-0 flex-col gap-3 px-6 pt-3 pb-[calc(var(--safe-bottom)+8px)]">
				{@render footer()}
			</footer>
		{/if}
		{@render overlay?.()}
	</div>
{/if}
