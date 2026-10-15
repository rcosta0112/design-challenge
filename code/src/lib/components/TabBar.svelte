<!-- Figma `TabBar` (Home only): 4 TabItems, Home active. Other tabs aren't prototyped. -->
<script lang="ts">
	import ArrowLeftRight from '@lucide/svelte/icons/arrow-left-right';
	import CreditCard from '@lucide/svelte/icons/credit-card';
	import House from '@lucide/svelte/icons/house';
	import User from '@lucide/svelte/icons/user';
	import { notInPrototype } from '$lib/toast.svelte';

	const tabs = [
		{ label: 'Home', icon: House, active: true },
		{ label: 'Pay', icon: ArrowLeftRight },
		{ label: 'Cards', icon: CreditCard },
		{ label: 'Profile', icon: User }
	];
</script>

<nav
	class="flex shrink-0 items-start justify-between bg-bar px-8 pt-2.5 pb-(--safe-bottom) backdrop-blur-[calc(var(--blur-xl)/2)]"
	aria-label="Main"
>
	{#each tabs as tab (tab.label)}
		<button
			class={[
				'flex w-16 flex-col items-center gap-0.5 text-label-xs',
				tab.active ? 'text-foreground' : 'text-muted-foreground'
			]}
			aria-current={tab.active ? 'page' : undefined}
			onclick={() => !tab.active && notInPrototype()}
		>
			<tab.icon size={24} />
			{tab.label}
		</button>
	{/each}
</nav>
