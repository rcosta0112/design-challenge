<!-- Figma `BalanceCard`: account, balance and one bank fact (neutral pill). -->
<script lang="ts">
	import Calendar from '@lucide/svelte/icons/calendar';

	let {
		account = 'Current account ••42',
		amount = '€2,184.50',
		fact = 'Payday in 10 days · 25 Oct'
	}: { account?: string; amount?: string; fact?: string } = $props();
</script>

<section
	class="flex w-full shrink-0 flex-col items-start gap-1 rounded-3xl bg-card p-5 backdrop-blur-[calc(var(--blur-xl)/2)]"
>
	<p class="text-label-sm text-muted-foreground">{account}</p>
	<p class="text-display-md">{amount}</p>
	<p class="mt-2 flex items-center gap-1.5 rounded-full bg-muted py-1.5 pr-3 pl-2.5 text-label-sm">
		<Calendar size={14} />
		{fact}
	</p>
</section>
