<!--
  Figma `Chip`. assumption = an editable fact the AI assumed (trailing pencil);
  suggestion = a tappable reply or fix (leading sparkles).
-->
<script lang="ts">
	import Pencil from '@lucide/svelte/icons/pencil';
	import Sparkles from '@lucide/svelte/icons/sparkles';

	let {
		type,
		label,
		onclick
	}: { type: 'assumption' | 'suggestion'; label: string; onclick?: () => void } = $props();
</script>

<button
	class="flex shrink-0 items-center gap-1.5 rounded-full bg-muted px-3 py-2 text-label-sm transition-colors active:bg-muted/60"
	{onclick}
>
	{#if type === 'suggestion'}<Sparkles size={14} />{/if}
	{label}
	{#if type === 'assumption'}<Pencil size={14} />{/if}
</button>
