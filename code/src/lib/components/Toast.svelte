<script lang="ts">
	import { fly } from 'svelte/transition';
	import { DURATION, ms } from '$lib/motion.svelte';
	import { toast } from '$lib/toast.svelte';
</script>

<div
	class="pointer-events-none absolute inset-x-0 top-[calc(var(--safe-top)+64px)] z-[80] flex justify-center"
	role="status"
	aria-live="polite"
>
	{#if toast.message}
		<p
			class="rounded-full bg-popover px-4 py-2 text-label-sm text-popover-foreground"
			transition:fly={{ y: -8, duration: ms(DURATION.fade) }}
		>
			{toast.message}
		</p>
	{/if}
</div>
