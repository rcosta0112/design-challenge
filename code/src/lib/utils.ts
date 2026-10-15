import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/** The type styles in layout.css (`--text-*`). Without them tailwind-merge
 *  reads `text-body-md` as a text colour and drops a real colour class next
 *  to it (it turned the Review plan label white on mint, 1.2:1). Shared with
 *  tailwind-variants' `tv()`; add new type styles here too. */
export const twMergeConfig = {
	extend: {
		theme: {
			text: [
				'display-md',
				'heading-xl',
				'heading-sm',
				'body-lg',
				'body-md',
				'body-sm',
				'label-md',
				'label-sm',
				'label-xs'
			]
		}
	}
};

const twMerge = extendTailwindMerge(twMergeConfig);

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Types the shadcn-svelte components import from here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
