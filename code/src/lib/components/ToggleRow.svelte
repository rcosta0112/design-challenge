<!-- Figma `ToggleRow`: label + detail + a 51 × 31 switch (shadcn-svelte Switch, size lg). -->
<script lang="ts">
	import { Switch } from '$lib/components/ui/switch';

	let {
		label,
		detail,
		checked,
		onchange
	}: { label: string; detail?: string; checked: boolean; onchange: (on: boolean) => void } =
		$props();

	const id = $props.id();
</script>

<div class="flex w-full items-center justify-between gap-4 py-2">
	<label for={id} class="flex min-w-0 flex-1 flex-col gap-0.5">
		<span class="text-label-md">{label}</span>
		{#if detail}<span class="text-body-sm text-muted-foreground">{detail}</span>{/if}
	</label>
	<Switch {id} size="lg" {checked} onCheckedChange={onchange} />
</div>
