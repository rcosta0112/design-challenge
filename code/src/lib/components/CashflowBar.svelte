<!--
  Figma `CashflowBar`: an average month as one stacked bar. fixed = chart-1,
  spending = chart-2, spare = the AI gradient (it's an estimate). Segment
  widths are proportional to the values. Draws in from the left.
-->
<script lang="ts">
	import { euro } from '$lib/plan.svelte';
	import EstimateTag from './EstimateTag.svelte';

	let {
		income = 2850,
		fixed = 1520,
		spending = 890
	}: { income?: number; fixed?: number; spending?: number } = $props();

	const spare = $derived(income - fixed - spending);
	const legend = $derived([
		{ label: 'Fixed bills', value: euro(fixed), swatch: 'bg-chart-1' },
		{ label: 'Everyday spending', value: euro(spending), swatch: 'bg-chart-2' },
		{
			label: 'Spare, usually',
			value: `~${euro(spare)}`,
			swatch: 'bg-linear-[166deg] from-ai-from from-15% to-ai-to to-85%'
		}
	]);
</script>

<section
	class="flex w-full flex-col gap-3 rounded-3xl bg-card p-5 backdrop-blur-[calc(var(--blur-xl)/2)]"
>
	<header class="flex items-center justify-between">
		<h3 class="text-label-sm text-muted-foreground">Cash flow, Jul–Sep</h3>
		<EstimateTag />
	</header>
	<p class="flex items-baseline gap-1.5">
		<span class="text-heading-xl">{euro(income)}</span>
		<span class="text-body-sm text-muted-foreground">income a month</span>
	</p>
	<div
		class="animate-grow-x flex h-3 w-full gap-0.5 overflow-hidden rounded-full"
		role="img"
		aria-label="{euro(fixed)} fixed bills, {euro(spending)} spending, about {euro(spare)} spare"
	>
		<div class="bg-chart-1" style:flex-grow={fixed}></div>
		<div class="bg-chart-2" style:flex-grow={spending}></div>
		<div
			class="bg-linear-[166deg] from-ai-from from-15% to-ai-to to-85%"
			style:flex-grow={spare}
		></div>
	</div>
	<dl class="flex flex-col gap-1.5">
		{#each legend as row (row.label)}
			<div class="flex items-center justify-between text-body-sm">
				<dt class="flex items-center gap-2 text-muted-foreground">
					<span class={['size-2 rounded-full', row.swatch]}></span>
					{row.label}
				</dt>
				<dd class="text-label-sm">{row.value}</dd>
			</div>
		{/each}
	</dl>
</section>
