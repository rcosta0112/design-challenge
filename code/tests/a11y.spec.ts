import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Axe on each route, colour contrast included (the text sits over the sky).
for (const path of ['/', '/plan']) {
	test(`${path} has no accessibility violations`, async ({ page }) => {
		await page.goto(path);
		await page.waitForLoadState('networkidle');
		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
	});
}
