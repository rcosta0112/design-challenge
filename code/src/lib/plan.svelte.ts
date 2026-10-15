// The one plan object (prototype-spec.md › Routes and state). The thread's
// plan card, the adjust sheet and the review all read this, so a change in
// one place shows everywhere. Numbers must match journey.md › Maths check.

/** Months as 'YYYY-MM'. */
export type Month = `${number}-${string}`;
export type PlanStatus = 'draft' | 'adjusting' | 'approved';
export type Fit = 'comfortable' | 'tight';

/** About what is left each month after fixed costs and usual spending (ab-02). */
export const SPARE_PER_MONTH = 440;

function monthsBetween(start: Month, end: Month): Month[] {
	const [sy, sm] = start.split('-').map(Number);
	const [ey, em] = end.split('-').map(Number);
	const out: Month[] = [];
	for (let y = sy, m = sm; y < ey || (y === ey && m <= em); m === 12 ? (y++, (m = 1)) : m++) {
		out.push(`${y}-${String(m).padStart(2, '0')}` as Month);
	}
	return out;
}

export class Plan {
	target = $state(3000);
	amount = $state(375);
	startMonth = $state<Month>('2026-10');
	endMonth = $state<Month>('2027-05');
	skipDecember = $state(false);
	status = $state<PlanStatus>('draft');

	months = $derived(
		monthsBetween(this.startMonth, this.endMonth).filter(
			(m) => !(this.skipDecember && m.endsWith('-12'))
		)
	);
	transfers = $derived(this.months.length);
	total = $derived(this.amount * this.transfers);
	/** What the target needs per month, rounded up to €5. */
	needed = $derived(Math.ceil(this.target / this.transfers / 5) * 5);
	fit = $derived<Fit>(this.amount > SPARE_PER_MONTH ? 'tight' : 'comfortable');
	leftOver = $derived(SPARE_PER_MONTH - this.amount);

	/** Set the amount to what the current dates need. */
	recalculate() {
		this.amount = this.needed;
	}

	reset() {
		this.target = 3000;
		this.amount = 375;
		this.startMonth = '2026-10';
		this.endMonth = '2027-05';
		this.skipDecember = false;
		this.status = 'draft';
	}
}

export const plan = new Plan();

export const euro = (n: number) =>
	new Intl.NumberFormat('en-IE', {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits: 0
	}).format(n);
