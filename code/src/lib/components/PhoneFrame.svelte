<!--
  Full screen on a phone; on desktop, a 390 × 844 phone-sized frame centred
  on the page (prototype-spec.md › Checks). The frame is `relative` and clips,
  so sheets and overlays stay inside it instead of covering the desktop page.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex h-dvh items-center justify-center sm:p-6">
	<div
		class="relative h-full w-full overflow-hidden bg-background sm:h-[844px] sm:max-h-full sm:w-[390px] sm:rounded-[48px]"
	>
		{@render children()}
	</div>
</div>
