<!--
  Figma `OptionCard`: one plan option in a single-select group.
  selected = color/muted fill + filled radio; otherwise card glass + ring.
-->
<script lang="ts">
	import Check from '@lucide/svelte/icons/check';

	let {
		title,
		detail,
		amount,
		selected,
		onclick
	}: { title: string; detail: string; amount: string; selected: boolean; onclick: () => void } =
		$props();
</script>

<button
	role="radio"
	aria-checked={selected}
	class={[
		'flex w-full items-center gap-3 rounded-xl p-4 text-left backdrop-blur-[calc(var(--blur-xl)/2)] transition-colors duration-200',
		selected ? 'bg-muted' : 'bg-card'
	]}
	{onclick}
>
	<span
		class={[
			'flex size-[22px] shrink-0 items-center justify-center rounded-full transition-colors',
			selected ? 'bg-primary text-primary-foreground' : 'border-2 border-muted-foreground'
		]}
	>
		{#if selected}<Check size={14} />{/if}
	</span>
	<span class="flex min-w-0 flex-1 flex-col gap-0.5">
		<span class="text-label-md">{title}</span>
		<span class="text-body-sm text-muted-foreground">{detail}</span>
	</span>
	<span class="text-label-md">{amount}</span>
</button>
