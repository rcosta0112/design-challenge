<!--
  A number that counts to its new value (e.g. €375 → €500 in ab-04).
  Instant when motion is reduced. Screen readers get the final value only.
-->
<script lang="ts">
	import { untrack } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { DURATION, EASE, ms } from '$lib/motion.svelte';

	let {
		value,
		format = (n: number) => String(Math.round(n)),
		class: className = ''
	}: { value: number; format?: (n: number) => string; class?: string } = $props();

	// Starts at the real value (no count from 0 on first paint), then tweens on change.
	const tween = new Tween(
		untrack(() => value),
		{ easing: EASE.out }
	);
	$effect(() => {
		tween.set(value, { duration: ms(DURATION.countUp) });
	});
</script>

<span class="tabular-nums {className}" aria-hidden="true">{format(tween.current)}</span>
<span class="sr-only">{format(value)}</span>
