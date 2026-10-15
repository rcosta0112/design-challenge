<!-- Figma `TopBar`: back + title + more, 44 × 44 tap targets, transparent. -->
<script lang="ts">
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';

	let { title, onback, onmore }: { title: string; onback: () => void; onmore?: () => void } =
		$props();
</script>

<header class="flex h-14 shrink-0 items-center justify-between px-2">
	<button class="flex size-11 items-center justify-center" aria-label="Back" onclick={onback}>
		<ChevronLeft size={24} />
	</button>
	<h1 class="text-heading-sm">{title}</h1>
	<button class="flex size-11 items-center justify-center" aria-label="More" onclick={onmore}>
		<Ellipsis size={24} />
	</button>
</header>
