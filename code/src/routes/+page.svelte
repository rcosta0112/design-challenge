<!--
  Home: ab-00.start (empty Ask box) → ab-01.intent (tapped: the goal types
  itself in, send enables). Send starts the thread and pushes to /plan; the
  typed text morphs into the thread's first bubble. Once a plan is approved,
  its goal card shows under the balance (screens.md › ab-06 notes).
-->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { fly } from 'svelte/transition';
	import BalanceCard from '$lib/components/BalanceCard.svelte';
	import Composer from '$lib/components/Composer.svelte';
	import PlanCard from '$lib/components/PlanCard.svelte';
	import Screen from '$lib/components/Screen.svelte';
	import TabBar from '$lib/components/TabBar.svelte';
	import { DURATION, ms } from '$lib/motion.svelte';
	import { plan } from '$lib/plan.svelte';
	import { INTENT, thread } from '$lib/thread.svelte';

	let tag = $state('ab-00.start');

	function send(text: string) {
		thread.start(text);
		goto(resolve('/plan'));
	}
</script>

<Screen {tag}>
	<div class="flex min-h-0 flex-1 flex-col gap-4 px-6 pt-2 pb-6">
		<div class="flex min-h-0 flex-1 items-center justify-center">
			<h1 class="w-75 text-center text-heading-xl">
				<span class="text-brand">Hi, Alex.</span><br />
				What can I help you with today?
			</h1>
		</div>
		<Composer script={INTENT} onsend={send} onactivate={() => (tag = 'ab-01.intent')} morph />
		<BalanceCard />
		{#if plan.status === 'approved'}
			<div in:fly={{ y: 12, duration: ms(DURATION.stream), delay: ms(300) }}>
				<PlanCard state="approved" compact />
			</div>
		{/if}
	</div>
	<TabBar />
</Screen>
