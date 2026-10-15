<!--
  Figma `PlanCard`: the plan object, read straight from the `plan` store.
  draft (ab-03): estimate, amount, Adjust + Review plan.
  approved (ab-06): goal tracker with Badge, ProgressBar, Undo + Change plan.
  compact: the approved card on Home, without rows or actions.
  The adjusting state is the ab-04 sheet. `actions={false}` keeps an older
  card in the thread as a record once the plan has moved on.
-->
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { euro, firstOf, plan, transferDate } from '$lib/plan.svelte';
	import { notInPrototype } from '$lib/toast.svelte';
	import AnimatedNumber from './AnimatedNumber.svelte';
	import Badge from './Badge.svelte';
	import EstimateTag from './EstimateTag.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import SummaryRow from './SummaryRow.svelte';

	let {
		state,
		compact = false,
		actions = true,
		onadjust,
		onreview
	}: {
		state: 'draft' | 'approved';
		compact?: boolean;
		actions?: boolean;
		onadjust?: () => void;
		onreview?: () => void;
	} = $props();
</script>

<section
	class="flex w-full flex-col gap-3 rounded-3xl bg-card p-5 backdrop-blur-[calc(var(--blur-xl)/2)]"
>
	<header class="flex items-center justify-between">
		<h3 class="text-heading-sm">Holiday 2027</h3>
		{#if state === 'draft'}<EstimateTag />{:else}<Badge label="Active" />{/if}
	</header>

	{#if state === 'draft'}
		<p class="flex items-baseline gap-1">
			<AnimatedNumber value={plan.amount} format={euro} class="text-display-md" />
			<span class="text-body-md text-muted-foreground">/ month</span>
		</p>
		<div>
			<SummaryRow label="Reaches {euro(plan.target)}" value={firstOf(plan.reachedOn)} />
			<SummaryRow label="Creates" value="Savings pot + monthly transfer" />
		</div>
		{#if actions}
			<div class="flex gap-3">
				<Button size="pill" variant="secondary" class="flex-1" onclick={onadjust}>Adjust</Button>
				<Button size="pill" class="flex-1" onclick={onreview}>Review plan</Button>
			</div>
		{/if}
	{:else}
		<ProgressBar saved={0} target={plan.target} />
		{#if !compact}
			<div>
				<SummaryRow
					label="Next transfer"
					value="{euro(plan.amount)} · {transferDate(plan.months[0], false)}"
				/>
				<SummaryRow label="Last transfer" value={transferDate(plan.lastMonth)} />
			</div>
			{#if actions}
				<div class="flex gap-3">
					<Button size="pill" variant="secondary" class="flex-1" onclick={notInPrototype}>
						Undo
					</Button>
					<Button size="pill" variant="secondary" class="flex-1" onclick={notInPrototype}>
						Change plan
					</Button>
				</div>
			{/if}
		{/if}
	{/if}
</section>
