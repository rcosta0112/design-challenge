<!-- Figma `ProgressBar`: goal progress, color/brand on a color/muted track. At 0 % the fill is a dot. -->
<script lang="ts">
	import { euro } from '$lib/plan.svelte';

	let { saved, target }: { saved: number; target: number } = $props();
	const percent = $derived(Math.round((saved / target) * 100));
</script>

<div class="flex w-full flex-col gap-2">
	<p class="flex justify-between text-label-sm">
		<span>{euro(saved)} of {euro(target)}</span>
		<span class="text-muted-foreground">{percent}%</span>
	</p>
	<div
		class="h-2 w-full overflow-hidden rounded-full bg-muted"
		role="progressbar"
		aria-valuenow={percent}
		aria-valuemin={0}
		aria-valuemax={100}
	>
		<div class="h-full min-w-2 rounded-full bg-brand" style:width="{percent}%"></div>
	</div>
</div>
