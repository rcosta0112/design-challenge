import { defineConfig, devices } from '@playwright/test';

// Adapted from Eigodojo's apps/gallery setup. The iPhone presets run in
// WebKit (Safari's engine) and Pixel 7 in Chromium, so this is the
// cross-browser pass. `figma-402` is the Figma frame width and the only
// project that runs the a11y check (it isn't viewport-sensitive).
// Reduced motion is on everywhere: the sky video then stays on its poster
// and the typewriter/route animations are skipped, so screenshots are stable.
// None of this simulates iOS Safari's toolbars; that still needs a phone.
export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: [['list'], ['html', { open: 'never' }]],
	use: {
		baseURL: 'http://localhost:5180',
		trace: 'on-first-retry',
		reducedMotion: 'reduce'
	},
	expect: {
		toHaveScreenshot: { maxDiffPixelRatio: 0.02 }
	},
	projects: [
		{
			name: 'figma-402',
			use: { ...devices['Desktop Chrome'], viewport: { width: 402, height: 874 } }
		},
		{ name: 'iphone-se', use: { ...devices['iPhone SE'] }, testIgnore: 'a11y.spec.ts' },
		{ name: 'iphone-14', use: { ...devices['iPhone 14'] }, testIgnore: 'a11y.spec.ts' },
		{ name: 'iphone-15-pro-max', use: { ...devices['iPhone 15 Pro Max'] }, testIgnore: 'a11y.spec.ts' },
		{ name: 'pixel-7', use: { ...devices['Pixel 7'] }, testIgnore: 'a11y.spec.ts' }
	],
	webServer: {
		command: 'npm run dev',
		url: 'http://localhost:5180',
		reuseExistingServer: !process.env.CI
	}
});
