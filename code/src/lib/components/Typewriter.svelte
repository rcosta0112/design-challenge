<!--
  Types `lines` in character by character (Home greeting). Every character is
  laid out from the start and the untyped ones are only invisible, so the
  line breaks are the final ones throughout. Plays once per visit; with
  reduced motion the text is simply there. Screen readers get the full text.
-->
<script module lang="ts">
	let played = false;
</script>

<script lang="ts">
	import { DURATION, ms, prefersReducedMotion } from '$lib/motion.svelte';

	let {
		lines,
		perChar = 35,
		delay = 400
	}: {
		/** One entry per line, each with its own class (e.g. the brand-coloured name). */
		lines: { text: string; class?: string }[];
		/** ms per character */
		perChar?: number;
		/** ms before the first character */
		delay?: number;
	} = $props();

	const total = $derived(lines.reduce((n, l) => n + l.text.length, 0));
	// Index of each line's first character in the whole text.
	const starts = $derived(
		lines.map((_, i) => lines.slice(0, i).reduce((n, l) => n + l.text.length, 0))
	);

	let shown = $state(played ? Infinity : 0);

	$effect(() => {
		if (played || prefersReducedMotion()) {
			shown = Infinity;
			played = true;
			return;
		}
		let timer = setTimeout(function tick() {
			shown++;
			if (shown < total) timer = setTimeout(tick, perChar);
			else played = true;
		}, delay);
		return () => clearTimeout(timer);
	});
</script>

<span class="sr-only">{lines.map((l) => l.text).join(' ')}</span>
<span aria-hidden="true">
	{#each lines as line, l (l)}
		<span class="block {line.class ?? ''}">
			{#each line.text as char, c (c)}<span
					class="transition-opacity"
					style:transition-duration="{ms(DURATION.fade)}ms"
					class:opacity-0={starts[l] + c >= shown}>{char}</span
				>{/each}
		</span>
	{/each}
</span>
