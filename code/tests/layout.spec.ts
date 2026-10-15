import { test, expect } from '@playwright/test';

// Responsive guards on phone viewports. The sky check is the iOS Safari
// black-strip fix (decision log, 2026-10-15): the sky must reach the bottom
// of the viewport. Playwright has no Safari toolbars, so this only proves
// the sky isn't shorter than the viewport, not that it runs under the bar.
for (const path of ['/', '/plan']) {
	test(`${path}: sky reaches the viewport bottom, no sideways scroll`, async ({ page }) => {
		await page.goto(path);
		await page.waitForLoadState('networkidle');
		const m = await page.evaluate(() => {
			const sky = document.querySelector('.sky-layer')!.getBoundingClientRect();
			return {
				skyTop: sky.top,
				skyBottom: sky.bottom,
				vh: window.innerHeight,
				scrollW: document.documentElement.scrollWidth,
				vw: window.innerWidth
			};
		});
		expect(m.skyTop).toBeLessThanOrEqual(0);
		expect(m.skyBottom).toBeGreaterThanOrEqual(m.vh);
		expect(m.scrollW).toBeLessThanOrEqual(m.vw);
	});
}
