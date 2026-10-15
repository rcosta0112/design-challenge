<!--
  One screen of the journey. `tag` is the screen tag shared with Figma frames,
  screens.md and the slides (CLAUDE.md › Working rules); it lands in
  `data-screen` so feedback on the prototype can name the exact screen.
  The `.screen` class is what the route view transition animates.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Sky from './Sky.svelte';

	let { tag, sky = '0011', children }: { tag: string; sky?: string; children: Snippet } = $props();
</script>

<main class="screen absolute inset-0 flex flex-col overflow-hidden bg-background" data-screen={tag}>
	<Sky id={sky} />
	<div class="relative flex min-h-0 flex-1 flex-col pt-(--safe-top)">
		{@render children()}
	</div>
</main>
