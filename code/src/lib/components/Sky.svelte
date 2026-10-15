<!--
  Figma `Background`: the sky behind every screen, here the rendered sky
  sequence as a looping video: the dark 0–24 s stretch (night to first light)
  of resources/nishita-sky-pingpong.mp4, played forward and back, because the
  bright sunrise beyond it fails contrast under the white text. Lives in
  the phone frame, not in each screen, so it keeps playing across routes.
  The poster is the video's own first frame (as the browser renders it), is
  preloaded, and sits under the video; the video fades in only once it is
  actually playing, so load has no flash and no colour jump. With reduced
  motion the video stays paused and only the poster shows.
-->
<script lang="ts">
	import { ms, prefersReducedMotion } from '$lib/motion.svelte';

	const POSTER = '/sky/nishita-sky-poster.webp';

	let video: HTMLVideoElement | undefined = $state();
	let playing = $state(false);

	$effect(() => {
		if (!video) return;
		if (prefersReducedMotion()) video.pause();
		// Autoplay can be refused (e.g. Low Power Mode); the poster then stays.
		else video.play().catch(() => {});
	});
</script>

<svelte:head>
	<link rel="preload" as="image" href={POSTER} fetchpriority="high" />
</svelte:head>

<img
	src={POSTER}
	alt=""
	fetchpriority="high"
	class="pointer-events-none absolute inset-0 size-full object-cover"
	aria-hidden="true"
/>
<video
	bind:this={video}
	src="/sky/nishita-sky-dark.mp4"
	muted
	loop
	playsinline
	preload="auto"
	disablepictureinpicture
	onplaying={() => (playing = true)}
	onpause={() => (playing = false)}
	class="pointer-events-none absolute inset-0 size-full object-cover transition-opacity ease-out"
	style:opacity={playing ? 1 : 0}
	style:transition-duration="{ms(600)}ms"
	aria-hidden="true"
></video>
