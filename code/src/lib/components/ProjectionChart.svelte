<!--
  Figma `ProjectionChart`: cumulative savings from October to the target date,
  a plateau for a skipped month, and a goal line. Estimate styling.
  Drawn from the plan, so it follows every change in the sheet.
-->
<script lang="ts">
	import { euro, nextMonth, plan, shortMonth, type Month } from '$lib/plan.svelte';
	import EstimateTag from './EstimateTag.svelte';

	const W = 314;
	const H = 72;
	const PAD = 6;

	// One point per month boundary, from October to the later of the target
	// date and the day the target is reached.
	const axis = $derived.by(() => {
		const end = plan.reachedOn > plan.deadline ? plan.reachedOn : plan.deadline;
		const months: Month[] = [];
		for (let m: Month = '2026-10'; m <= end; m = nextMonth(m)) months.push(m);
		return months;
	});
	const points = $derived(
		axis.map((m, i) => {
			const saved = plan.amount * plan.months.filter((t) => t < m).length;
			const x = (i / (axis.length - 1)) * W;
			const y =
				H - PAD - (Math.min(saved, plan.target * 1.05) / (plan.target * 1.05)) * (H - PAD * 2);
			return { m, x, y };
		})
	);
	const goalY = $derived(H - PAD - (plan.target / (plan.target * 1.05)) * (H - PAD * 2));
	const skipped = $derived(plan.skipDecember ? points.find((p) => p.m.endsWith('-12')) : undefined);
	const step = $derived(W / (axis.length - 1));
	const labels = $derived(points.filter((_, i) => i % 2 === 0 || i === points.length - 1));
</script>

<section
	class="flex w-full flex-col gap-3 rounded-3xl bg-card p-4 backdrop-blur-[calc(var(--blur-xl)/2)]"
>
	<header class="flex items-center justify-between">
		<h3 class="text-label-sm text-muted-foreground">
			€0 → {euro(plan.total)} by {`1 ${shortMonth(plan.reachedOn)}`}
		</h3>
		<EstimateTag />
	</header>
	<svg
		viewBox="0 0 {W} {H}"
		class="animate-grow-x h-[72px] w-full overflow-visible"
		role="img"
		aria-label="Savings grow to {euro(plan.total)} by 1 {shortMonth(plan.reachedOn)}{skipped
			? ', with December skipped'
			: ''}"
	>
		{#if skipped}
			<rect x={skipped.x - 4} y="0" width={step + 8} height={H} rx="10" class="fill-muted" />
		{/if}
		<line x1="0" x2={W} y1={goalY} y2={goalY} class="stroke-border" stroke-width="1" />
		<polyline
			points={points.map((p) => `${p.x},${p.y}`).join(' ')}
			fill="none"
			class="stroke-primary"
			stroke-width="2"
			stroke-linejoin="round"
			stroke-linecap="round"
		/>
	</svg>
	<div class="relative h-3.5 text-label-xs text-muted-foreground" aria-hidden="true">
		{#each labels as p, i (p.m)}
			<span
				class={[
					'absolute whitespace-nowrap',
					i === 0 ? 'left-0' : i === labels.length - 1 ? 'right-0' : '-translate-x-1/2'
				]}
				style:left={i === 0 || i === labels.length - 1 ? undefined : `${(p.x / W) * 100}%`}
			>
				{shortMonth(p.m)}{skipped?.m === p.m ? ' skipped' : ''}
			</span>
		{/each}
	</div>
</section>
