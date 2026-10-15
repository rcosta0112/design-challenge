<!--
  The `Background` component from Figma: one of 14 sky renders behind the
  screen. Until the renders are exported for the web (static/sky/<id>.webp),
  a gradient stands in so the layout and contrast can be worked on.
-->
<script lang="ts">
	let { id }: { id: string } = $props();
</script>

<div
	class="absolute inset-0 bg-[linear-gradient(180deg,#1d3a4a_0%,#2a5560_35%,#13201c_75%,#0e1512_100%)]"
	data-sky={id}
	aria-hidden="true"
></div>
