<!--
  One screen of the journey. `tag` is the screen tag shared with Figma frames,
  screens.md and the slides (CLAUDE.md › Working rules); it lands in
  `data-screen` so feedback on the prototype can name the exact screen.
  The `.screen` class is what the route view transition animates. Screens are
  transparent: the sky video behind them lives in PhoneFrame.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { tag, children }: { tag: string; children: Snippet } = $props();
</script>

<main class="screen absolute inset-0 flex flex-col overflow-hidden" data-screen={tag}>
	<div class="relative flex min-h-0 flex-1 flex-col pt-(--safe-top)">
		{@render children()}
	</div>
</main>
