<!--
  The "approving" state of ab-05: a Face ID prompt over the sheet for about
  a second, then a tick. Calls `ondone` when finished.
-->
<script lang="ts">
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import ScanFace from '@lucide/svelte/icons/scan-face';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { DURATION, ms, wait } from '$lib/motion.svelte';

	let { ondone }: { ondone: () => void } = $props();
	let ok = $state(false);

	onMount(async () => {
		await wait(1000);
		ok = true;
		await wait(600);
		ondone();
	});
</script>

<div
	class="absolute inset-0 z-[60] flex items-center justify-center bg-overlay"
	transition:fade={{ duration: ms(DURATION.fade) }}
>
	<div
		class="flex size-40 flex-col items-center justify-center gap-3 rounded-3xl bg-popover"
		role="status"
		aria-live="assertive"
		in:scale={{ start: 0.9, duration: ms(DURATION.fade) }}
	>
		{#if ok}
			<span in:scale={{ start: 0.6, duration: ms(DURATION.fade) }}>
				<CircleCheck size={56} strokeWidth={1.5} class="text-primary" />
			</span>
		{:else}
			<ScanFace size={56} strokeWidth={1.5} class="animate-pulse" />
		{/if}
		<p class="text-label-sm">{ok ? 'Approved' : 'Face ID'}</p>
	</div>
</div>
