<!--
  The thread: ab-02.understand, ab-03.plan, ab-06.done, with ab-04.adjust and
  ab-05.review as sheets over it. Scaffold only: it wires the plan object,
  the sheets (shallow routing, so Back closes them), stream-in and count-up.
-->
<script lang="ts">
	import { pushState, replaceState } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import AnimatedNumber from '$lib/components/AnimatedNumber.svelte';
	import Screen from '$lib/components/Screen.svelte';
	import Sheet from '$lib/components/Sheet.svelte';
	import { Button } from '$lib/components/ui/button';
	import { DURATION, EASE, ms } from '$lib/motion.svelte';
	import { euro, plan } from '$lib/plan.svelte';

	const sheet = $derived(page.state.sheet);
	const tag = $derived(
		sheet === 'review'
			? 'ab-05.review'
			: sheet === 'adjust'
				? plan.fit === 'tight'
					? 'ab-04.adjust--tight'
					: 'ab-04.adjust'
				: 'ab-03.plan'
	);

	// Swapping sheet content (adjust ⇄ review) replaces the history entry, so
	// one Back always closes the sheet rather than stepping through its pages.
	const openSheet = (name: 'adjust' | 'review') =>
		sheet ? replaceState('', { sheet: name }) : pushState('', { sheet: name });
	const closeSheet = () => history.back();
</script>

<Screen {tag}>
	<header class="flex items-center gap-3 px-4 pt-12 pb-3">
		<Button variant="ghost" href={resolve('/')} aria-label="Back">←</Button>
		<h1 class="text-heading-sm">Holiday plan</h1>
	</header>

	<div class="flex flex-1 flex-col gap-3 overflow-y-auto px-6 pb-6" data-screen-part={tag}>
		<p
			class="self-end rounded-xl bg-muted px-4 py-2 text-body-md"
			in:fly|global={{ y: 12, duration: ms(DURATION.stream), easing: EASE.out }}
		>
			Can I save €3,000 for a holiday by next summer?
		</p>
		<div
			class="rounded-xl bg-card p-5 backdrop-blur-xl"
			in:fly|global={{ y: 12, delay: ms(200), duration: ms(DURATION.stream), easing: EASE.out }}
		>
			<p class="text-body-sm text-muted-foreground">Monthly transfer</p>
			<AnimatedNumber value={plan.amount} format={euro} class="text-display-amount" />
			<p class="text-body-sm text-muted-foreground">
				{plan.transfers} transfers · {euro(plan.total)} · {plan.fit}
			</p>
			<div class="mt-4 flex gap-2">
				<Button variant="secondary" onclick={() => openSheet('adjust')}>Adjust</Button>
				<Button onclick={() => openSheet('review')}>Review plan</Button>
			</div>
		</div>
	</div>

	<Sheet
		open={!!sheet}
		label={sheet === 'review' ? 'Review plan' : 'Adjust plan'}
		onclose={closeSheet}
	>
		<div class="flex flex-col gap-4 p-6">
			<h2 class="text-heading-sm">{sheet === 'review' ? 'Review plan' : 'Adjust plan'}</h2>
			<AnimatedNumber
				value={plan.amount}
				format={euro}
				class="text-display-amount {plan.fit === 'tight' ? 'text-warning-foreground' : ''}"
			/>
			{#if sheet === 'adjust'}
				<div class="flex flex-wrap gap-2">
					<Button
						variant="secondary"
						onclick={() => (
							(plan.startMonth = '2026-12'),
							(plan.skipDecember = false),
							plan.recalculate()
						)}
					>
						Start in December
					</Button>
					<Button
						variant="secondary"
						onclick={() => (
							(plan.startMonth = '2026-10'),
							(plan.skipDecember = true),
							plan.recalculate()
						)}
					>
						Start Oct, skip Dec
					</Button>
				</div>
				<Button onclick={() => openSheet('review')}>Review plan</Button>
			{:else}
				<Button variant="secondary" onclick={() => openSheet('adjust')}>Back to plan</Button>
			{/if}
		</div>
	</Sheet>
</Screen>
