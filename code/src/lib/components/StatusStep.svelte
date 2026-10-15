<!-- Figma `StatusStep`: one "what I looked at" line, shown in sequence before the AI answers. -->
<script lang="ts">
	import Check from '@lucide/svelte/icons/check';

	let { step }: { step: string } = $props();
</script>

<p class="flex items-center gap-2 text-label-sm text-muted-foreground">
	<Check size={16} />
	{step}
</p>
