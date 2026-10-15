<!--
  Figma `Banner`. info = color/muted; warning = color/warning with
  warning-foreground text. Status is never colour alone: icon + wording.
-->
<script lang="ts">
	import Info from '@lucide/svelte/icons/info';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';

	let { kind, text }: { kind: 'info' | 'warning'; text: string } = $props();
</script>

<div
	class={[
		'flex w-full items-start gap-3 rounded-xl py-3 pr-4 pl-3 text-body-sm',
		kind === 'warning' ? 'bg-warning text-warning-foreground' : 'bg-muted'
	]}
	role={kind === 'warning' ? 'alert' : 'status'}
>
	{#if kind === 'warning'}
		<TriangleAlert size={20} class="shrink-0" />
	{:else}
		<Info size={20} class="shrink-0" />
	{/if}
	<p class="flex-1">{text}</p>
</div>
