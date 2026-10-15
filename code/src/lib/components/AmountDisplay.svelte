<!--
  Figma `AmountDisplay`: the monthly amount (counts to new values), unit and a
  detail line. tight = amount in color/warning-foreground.
-->
<script lang="ts">
	import { euro } from '$lib/plan.svelte';
	import AnimatedNumber from './AnimatedNumber.svelte';

	let {
		amount,
		detail,
		unit = '/ month',
		status = 'default'
	}: { amount: number; detail?: string; unit?: string; status?: 'default' | 'tight' } = $props();
</script>

<div class="flex flex-col items-start gap-1">
	<p class="flex items-baseline gap-1">
		<AnimatedNumber
			value={amount}
			format={euro}
			class={[
				'text-display-md transition-colors duration-300',
				status === 'tight' && 'text-warning-foreground'
			]}
		/>
		<span class="text-body-md text-muted-foreground">{unit}</span>
	</p>
	{#if detail}
		<p class="text-body-sm text-muted-foreground">{detail}</p>
	{/if}
</div>
