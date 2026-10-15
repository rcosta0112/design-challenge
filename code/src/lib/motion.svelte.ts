// One prefers-reduced-motion signal for every transition, count-up and
// stream-in, so they all switch to instant swaps together
// (prototype-spec.md › Checks). Pattern taken from Eigodojo's ui/motion.
import { cubicIn, cubicOut } from 'svelte/easing';

let reduced = $state(false);

if (typeof window !== 'undefined') {
	const query = window.matchMedia('(prefers-reduced-motion: reduce)');
	reduced = query.matches;
	query.addEventListener('change', (e) => (reduced = e.matches));
}

export function prefersReducedMotion(): boolean {
	return reduced;
}

/** A call site's normal duration, or 0 when motion is reduced. */
export function ms(duration: number): number {
	return reduced ? 0 : duration;
}

/** Durations from prototype-spec.md, in one place so they can be tuned together. */
export const DURATION = {
	sheet: 300,
	fade: 200,
	stream: 240,
	countUp: 600,
	statusStep: 300
} as const;

export const EASE = { out: cubicOut, in: cubicIn };

export const wait = (duration: number) =>
	new Promise<void>((resolve) => setTimeout(resolve, ms(duration)));
