<!--
  Home: ab-00.start, ab-01.intent (composer state). Scaffold only: real
  layout comes from the hi-fi frames in Figma (page `Screens`).
-->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Screen from '$lib/components/Screen.svelte';
</script>

<Screen tag="ab-00.start">
	<div class="flex flex-1 flex-col justify-end gap-4 px-6 pb-8">
		<p class="text-body-sm text-muted-foreground">Payday in 10 days</p>
		<h1 class="text-heading-xl">Hi Alex</h1>
		<button
			class="rounded-full bg-composer px-5 py-3 text-left text-body-md text-composer-muted-foreground"
			onclick={() => goto(resolve('/plan'))}
		>
			Ask anything about your money
		</button>
	</div>
</Screen>
