<script lang="ts">
	import './layout.css';
	import { onNavigate } from '$app/navigation';
	import PhoneFrame from '$lib/components/PhoneFrame.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// How deep each route sits in the journey, so a route change can tell a
	// push (slide in from the right) from a pop (slide back).
	const depth = (path: string | undefined) => (path === '/plan' ? 1 : 0);

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;

		const forward = depth(navigation.to?.url.pathname) > depth(navigation.from?.url.pathname);
		document.documentElement.dataset.nav = forward ? 'forward' : 'back';

		return new Promise((resolve) => {
			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
			transition.finished.finally(() => delete document.documentElement.dataset.nav);
		});
	});
</script>

<svelte:head>
	<title>WIT Design Challenge - AI-native banking prototype</title>
</svelte:head>

<PhoneFrame>
	{@render children()}
</PhoneFrame>
