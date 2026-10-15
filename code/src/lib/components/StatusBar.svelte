<!--
  iOS status bar, only inside the desktop phone frame (a real phone draws its
  own). Figma: "Status Bar - iPhone" from the iOS 18 kit.
-->
<script lang="ts">
	import battery from '$lib/assets/figma/battery.svg';
	import cellular from '$lib/assets/figma/cellular.svg';
	import wifi from '$lib/assets/figma/wifi.svg';
</script>

<div
	class="pointer-events-none absolute inset-x-0 top-0 z-[70] hidden h-[50px] items-center pt-[21px] sm:flex"
	aria-hidden="true"
>
	<div class="flex flex-1 justify-center pr-1.5 pl-4">
		<span class="text-[17px] leading-[22px] font-semibold">9:41</span>
	</div>
	<div class="w-[124px]"></div>
	<div class="flex flex-1 items-center justify-center gap-[7px] pr-4 pl-1.5">
		<img src={cellular} alt="" width="19.2" height="12.226" />
		<img src={wifi} alt="" width="17.142" height="12.328" />
		<img src={battery} alt="" width="27.328" height="13" />
	</div>
</div>
