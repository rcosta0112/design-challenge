<!--
  Full screen on a phone; on desktop, a 402 × 874 frame (iPhone 16 Pro, the
  Figma frame size) centred on the page, with a status bar and home indicator.
  The frame is `relative` and clips, so sheets, overlays and toasts stay inside
  it. It sets --safe-top / --safe-bottom: the real safe areas on a phone, the
  iOS bar heights (50 / 34) in the desktop frame.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import StatusBar from './StatusBar.svelte';
	import Toast from './Toast.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex h-dvh items-center justify-center sm:p-6">
	<div
		class="relative h-full w-full overflow-hidden bg-background [--safe-bottom:max(env(safe-area-inset-bottom),12px)] [--safe-top:env(safe-area-inset-top)] sm:h-[874px] sm:max-h-full sm:w-[402px] sm:rounded-[48px] sm:[--safe-bottom:34px] sm:[--safe-top:50px]"
	>
		{@render children()}
		<StatusBar />
		<Toast />
		<div
			class="pointer-events-none absolute bottom-2 left-1/2 z-[70] hidden h-[5px] w-[144px] -translate-x-1/2 rounded-full bg-foreground sm:block"
			aria-hidden="true"
		></div>
	</div>
</div>
