<!--
  Figma `Slider`: monthly amount €300–€500, snaps to €5, with a marker at the
  ~€440 usually spare. status=tight fills with color/warning-foreground once
  the value is above the spare. Built on the shadcn-svelte Slider.
-->
<script lang="ts">
	import { Slider } from '$lib/components/ui/slider';
	import { SLIDER, SPARE_PER_MONTH, euro } from '$lib/plan.svelte';

	let { value, onchange }: { value: number; onchange: (value: number) => void } = $props();

	const tight = $derived(value > SPARE_PER_MONTH);
	const at = (v: number) => `${((v - SLIDER.min) / (SLIDER.max - SLIDER.min)) * 100}%`;
</script>

<div class="flex w-full flex-col gap-2">
	<div class="relative flex h-7 items-center">
		<Slider
			type="single"
			{value}
			min={SLIDER.min}
			max={SLIDER.max}
			step={SLIDER.step}
			onValueChange={(v: number) => onchange(v)}
			aria-label="Monthly amount"
			trackClass="data-horizontal:h-1.5 bg-muted"
			rangeClass={tight ? 'bg-warning-foreground' : 'bg-primary'}
			thumbClass="size-7 border-0 bg-foreground ring-0 hover:ring-0 active:ring-0 focus-visible:ring-4 focus-visible:ring-ring/40"
		/>
		<span
			class="pointer-events-none absolute top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
			style:left={at(SPARE_PER_MONTH)}
			aria-hidden="true"
		></span>
	</div>
	<div class="relative h-3.5 text-label-xs text-muted-foreground" aria-hidden="true">
		<span class="absolute left-0">{euro(SLIDER.min)}</span>
		<span class="absolute -translate-x-1/2" style:left={at(SPARE_PER_MONTH)}>
			~{euro(SPARE_PER_MONTH)} spare
		</span>
		<span class="absolute right-0">{euro(SLIDER.max)}</span>
	</div>
</div>
