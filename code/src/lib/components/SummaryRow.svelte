<!-- Figma `SummaryRow`: label / value. -->
<script lang="ts">
	let { label, value }: { label: string; value: string } = $props();
</script>

<div class="flex w-full items-center justify-between gap-4 py-3 text-body-sm">
	<span class="text-muted-foreground">{label}</span>
	<span class="text-right text-label-sm">{value}</span>
</div>
