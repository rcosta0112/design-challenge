import { test, expect } from '@playwright/test';

// Baselines live in tests/visual.spec.ts-snapshots/ and are committed.
// After an intentional visual change: `npm run test:visual:update`, then
// review the new images before committing them.
for (const [name, path] of [
	['home', '/'],
	['plan', '/plan']
] as const) {
	test(`${name} screen`, async ({ page }) => {
		await page.goto(path);
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot(`${name}.png`);
	});
}
