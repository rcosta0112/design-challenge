<!--
  Figma `Background`: one of 14 sky renders behind the screen. Only `0011` is
  exported so far (static/sky/); thread screens and Home both use it.
-->
<script lang="ts">
	let { id = '0011' }: { id?: string } = $props();
</script>

<img
	src="/sky/{id}.webp"
	alt=""
	class="pointer-events-none absolute inset-0 size-full object-cover"
	data-sky={id}
	aria-hidden="true"
/>
