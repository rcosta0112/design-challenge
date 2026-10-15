<!--
  Figma `ChatBubble`. user = right-aligned bubble (max 280, color/muted).
  ai = no bubble, "Assistant" label with the AiOrb, full width.
-->
<script lang="ts">
	import AiOrb from './AiOrb.svelte';

	let {
		sender,
		text,
		morph = false
	}: { sender: 'user' | 'ai'; text: string; morph?: boolean } = $props();
</script>

{#if sender === 'user'}
	<div class="flex w-full justify-end">
		<p
			class={[
				'max-w-[280px] rounded-2xl rounded-br-sm bg-muted px-4 py-3 text-body-md',
				morph && 'vt-intent'
			]}
		>
			{text}
		</p>
	</div>
{:else}
	<div class="flex w-full flex-col gap-2">
		<p class="flex items-center gap-1.5 text-label-xs text-muted-foreground">
			<AiOrb />
			Assistant
		</p>
		<p class="text-body-md whitespace-pre-line">{text}</p>
	</div>
{/if}
