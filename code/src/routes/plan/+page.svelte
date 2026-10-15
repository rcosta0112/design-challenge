<!--
  The thread: ab-02.understand → ab-03.plan → ab-06.done, one scrolling
  conversation, with ab-04.adjust (and --tight) and ab-05.review as sheets
  over it. Sheets open with shallow routing, so Back closes them; swapping
  adjust ⇄ review replaces the history entry. Every number reads `plan`.
-->
<script lang="ts">
	import Pencil from '@lucide/svelte/icons/pencil';
	import ScanFace from '@lucide/svelte/icons/scan-face';
	import { tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { goto, pushState, replaceState } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import AmountDisplay from '$lib/components/AmountDisplay.svelte';
	import AmountSlider from '$lib/components/AmountSlider.svelte';
	import Banner from '$lib/components/Banner.svelte';
	import CashflowBar from '$lib/components/CashflowBar.svelte';
	import ChatBubble from '$lib/components/ChatBubble.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import Composer from '$lib/components/Composer.svelte';
	import FaceIdPrompt from '$lib/components/FaceIdPrompt.svelte';
	import OptionCard from '$lib/components/OptionCard.svelte';
	import PlanCard from '$lib/components/PlanCard.svelte';
	import ProjectionChart from '$lib/components/ProjectionChart.svelte';
	import Screen from '$lib/components/Screen.svelte';
	import Sheet from '$lib/components/Sheet.svelte';
	import StatusStep from '$lib/components/StatusStep.svelte';
	import SummaryRow from '$lib/components/SummaryRow.svelte';
	import ToggleRow from '$lib/components/ToggleRow.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
	import { Button } from '$lib/components/ui/button';
	import { DURATION, EASE, ms, prefersReducedMotion } from '$lib/motion.svelte';
	import {
		FIXES,
		OPTIONS,
		SPARE_PER_MONTH,
		euro,
		firstOf,
		plan,
		transferDate
	} from '$lib/plan.svelte';
	import { STEPS, thread } from '$lib/thread.svelte';
	import { notInPrototype } from '$lib/toast.svelte';

	const ASSUMPTIONS = [
		'Income €2,850',
		'Spending Jul–Sep',
		'Target 1 Jun 2027',
		'First transfer 25 Oct'
	];
	const START_IN_DECEMBER = 'What if I start in December?';

	// Arriving here directly (reload, shared link) starts the conversation too.
	if (browser && !thread.started) thread.start();

	// ── Sheets ───────────────────────────────────────────────────────────────
	const sheet = $derived(page.state.sheet);
	const tight = $derived(plan.fit === 'tight');
	const tag = $derived(
		sheet === 'review'
			? 'ab-05.review'
			: sheet === 'adjust'
				? tight
					? 'ab-04.adjust--tight'
					: 'ab-04.adjust'
				: `ab-0${{ understand: 2, plan: 3, done: 6 }[thread.stage]}.${thread.stage}`
	);

	let openedWith = plan.snapshot();
	let approving = $state(false);

	function openSheet(name: 'adjust' | 'review') {
		if (!sheet) openedWith = plan.snapshot();
		if (sheet) replaceState('', { sheet: name });
		else pushState('', { sheet: name });
	}
	const closeSheet = () => history.back();

	// However the sheet closes (Done, Back, overlay, Escape), log what changed
	// in the thread, then continue to the receipt if it was approved.
	let wasOpen = false;
	$effect(() => {
		const open = !!sheet;
		if (wasOpen && !open) {
			if (!plan.sameAs(openedWith)) thread.add({ type: 'change', text: plan.describe() });
			plan.sheetMessages = [];
			plan.note = null;
			if (plan.status === 'approved' && thread.stage !== 'done') thread.approved();
		}
		wasOpen = open;
	});

	function approve() {
		approving = true;
	}
	function approved() {
		plan.approve();
		approving = false;
		closeSheet();
	}

	// ── Thread scrolling: keep the newest turn in view ──────────────────────
	let scroller: HTMLElement | undefined = $state();
	let firstScroll = true;
	$effect(() => {
		// Re-run whenever something is appended or a status step ticks.
		void thread.items.length;
		void thread.items.map((i) => (i.type === 'steps' ? i.shown : 0));
		tick().then(() => {
			scroller?.scrollTo({
				top: scroller.scrollHeight,
				behavior: firstScroll || prefersReducedMotion() ? 'instant' : 'smooth'
			});
			firstScroll = false;
		});
	});

	const isDefaultDates = $derived(
		plan.startMonth === '2026-10' &&
			!plan.skipDecember &&
			plan.target === 3000 &&
			plan.deadline === '2027-06'
	);

	let menuOpen = $state(false);
	function restart() {
		menuOpen = false;
		thread.reset();
		goto(resolve('/'));
	}

	const enter = { y: 12, duration: ms(DURATION.stream), easing: EASE.out };
</script>

<Screen {tag}>
	<TopBar
		title="Holiday plan"
		onback={() => goto(resolve('/'))}
		onmore={() => (menuOpen = !menuOpen)}
	/>

	{#if menuOpen}
		<div
			class="absolute top-[calc(var(--safe-top)+52px)] right-4 z-30 rounded-xl bg-popover p-1"
			transition:fade={{ duration: ms(DURATION.fade) }}
		>
			<button class="rounded-lg px-4 py-2.5 text-label-sm" onclick={restart}>
				Restart prototype
			</button>
		</div>
	{/if}

	<div bind:this={scroller} class="min-h-0 flex-1 overflow-y-auto px-6 pb-5">
		<div class="flex flex-col gap-3">
			{#each thread.items as item, index (item.id)}
				<div in:fly={enter}>
					{#if item.type === 'user'}
						<ChatBubble sender="user" text={item.text} morph={index === 0} />
					{:else if item.type === 'ai'}
						<ChatBubble sender="ai" text={item.text} />
					{:else if item.type === 'steps'}
						<div class="flex flex-col gap-2">
							{#each STEPS.slice(0, item.shown) as step (step)}
								<div in:fly={{ ...enter, y: 6 }}><StatusStep {step} /></div>
							{/each}
						</div>
					{:else if item.type === 'cashflow'}
						<CashflowBar />
					{:else if item.type === 'assumptions'}
						<div class="flex flex-col gap-2">
							<p class="text-label-xs text-muted-foreground">Based on · tap to correct</p>
							<div class="flex flex-wrap gap-2">
								{#each ASSUMPTIONS as label (label)}
									<Chip type="assumption" {label} onclick={notInPrototype} />
								{/each}
							</div>
						</div>
					{:else if item.type === 'options'}
						<div class="flex flex-col gap-2" role="radiogroup" aria-label="Plan options">
							{#each OPTIONS as option (option.title)}
								<OptionCard
									title={option.title}
									detail={option.detail}
									amount="{euro(option.amount)}/mo"
									selected={isDefaultDates && plan.amount === option.amount}
									onclick={() => plan.status === 'draft' && plan.choose(option.amount)}
								/>
							{/each}
						</div>
					{:else if item.type === 'plan'}
						<PlanCard
							state="draft"
							actions={plan.status === 'draft'}
							onadjust={() => openSheet('adjust')}
							onreview={() => openSheet('review')}
						/>
					{:else if item.type === 'change'}
						<p class="flex items-center gap-2 text-label-sm text-muted-foreground">
							<Pencil size={16} />
							{item.text}
						</p>
					{:else if item.type === 'goal'}
						<PlanCard state="approved" />
					{:else if item.type === 'nudge'}
						<div class="flex flex-wrap gap-2">
							<Chip
								type="suggestion"
								label="Yes, nudge me"
								onclick={() => thread.answerNudge(true)}
							/>
							<Chip type="suggestion" label="Not now" onclick={() => thread.answerNudge(false)} />
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<div class="shrink-0 px-6 pb-(--safe-bottom)">
		<Composer />
	</div>

	<Sheet
		open={!!sheet}
		title={sheet === 'review' ? 'Review and approve' : 'Holiday 2027'}
		done={sheet === 'adjust' ? closeSheet : undefined}
		onclose={closeSheet}
	>
		{#if sheet === 'adjust'}
			{#each plan.sheetMessages as text (text)}
				<div in:fly={enter}><ChatBubble sender="user" {text} /></div>
			{/each}
			<AmountDisplay
				amount={plan.amount}
				status={tight ? 'tight' : 'default'}
				detail={tight
					? `${plan.transfers} transfers · ${plan.range}`
					: `${plan.transfers} transfers · reaches ${euro(plan.total)} by ${firstOf(plan.reachedOn)}`}
			/>
			{#if tight}
				<div in:fly={enter}>
					<Banner
						kind="warning"
						text="Tight: {euro(plan.amount)} is more than the ~{euro(
							SPARE_PER_MONTH
						)} you usually have spare. Want to move the date or lower the target?"
					/>
				</div>
				<div class="flex flex-col items-start gap-2" in:fly={{ ...enter, delay: ms(120) }}>
					{#each FIXES as fix (fix.label)}
						<Chip type="suggestion" label={fix.label} onclick={() => plan.applyFix(fix)} />
					{/each}
				</div>
			{:else if plan.note}
				<div in:fly={enter}><Banner kind="info" text={plan.note} /></div>
			{/if}
			<AmountSlider value={plan.amount} onchange={(v) => plan.setAmount(v)} />
			{#if tight}
				<div>
					<SummaryRow label="First transfer" value={transferDate(plan.months[0])} />
					<SummaryRow label="Target date" value={firstOf(plan.deadline)} />
				</div>
			{:else}
				<ToggleRow
					label="Skip December"
					detail="Your highest-spending month"
					checked={plan.skipDecember}
					onchange={(on) => plan.setSkipDecember(on)}
				/>
				<div>
					<SummaryRow label="Target" value={euro(plan.target)} />
					<SummaryRow label="From" value="Current account ••42" />
				</div>
				<ProjectionChart />
			{/if}
		{:else if sheet === 'review'}
			<p class="text-body-lg">{plan.summary}</p>
			<div>
				<SummaryRow label="What" value="New pot + monthly transfer" />
				<SummaryRow label="Amount" value="{euro(plan.amount)} a month" />
				<SummaryRow label="Transfers" value="{plan.transfers} · {euro(plan.total)} in total" />
				<SummaryRow label="From" value="Current account ••42" />
				<SummaryRow label="To" value="Holiday 2027 · easy access" />
				<SummaryRow label="First transfer" value={transferDate(plan.months[0])} />
				<SummaryRow label="Stop or change" value="Anytime, from the pot" />
			</div>
			{#if tight}
				<Banner
					kind="warning"
					text="Tight: {euro(plan.amount)} is more than the ~{euro(
						SPARE_PER_MONTH
					)} you usually have spare."
				/>
			{/if}
			<Banner
				kind="info"
				text="Nothing moves until you approve. Amounts are estimates based on Jul–Sep."
			/>
		{/if}

		{#snippet footer()}
			{#if sheet === 'review'}
				<Button size="pill" class="w-full" onclick={approve} disabled={approving}>
					<ScanFace />
					Approve with Face ID
				</Button>
				<Button size="pill" variant="secondary" class="w-full" onclick={() => openSheet('adjust')}>
					Back to plan
				</Button>
			{:else}
				<Button size="pill" class="w-full" onclick={() => openSheet('review')}>Review plan</Button>
				<Composer
					placeholder="Ask to change something…"
					script={plan.startMonth === '2026-12' ? undefined : START_IN_DECEMBER}
					onsend={(text) => plan.startInDecember(text)}
				/>
			{/if}
		{/snippet}

		{#snippet overlay()}
			{#if approving}<FaceIdPrompt ondone={approved} />{/if}
		{/snippet}
	</Sheet>
</Screen>
