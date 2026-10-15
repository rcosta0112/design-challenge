<!-- Figma `Badge`: short status label, mint fill + ink text. -->
<script lang="ts">
	let { label }: { label: string } = $props();
</script>

<span class="shrink-0 rounded-full bg-brand px-2.5 py-1 text-label-xs text-brand-foreground">
	{label}
</span>
