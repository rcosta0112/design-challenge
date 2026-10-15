// The one plan object (prototype-spec.md › Routes and state). The thread's
// plan card, the adjust sheet and the review all read this, so a change in
// one place shows everywhere. Numbers must match journey.md › Maths check.

/** Months as 'YYYY-MM'. */
export type Month = string;
export type PlanStatus = 'draft' | 'approved';
export type Fit = 'comfortable' | 'tight';

/** About what is left each month after fixed costs and usual spending (ab-02). */
export const SPARE_PER_MONTH = 440;
export const SLIDER = { min: 300, max: 500, step: 5 } as const;

const SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LONG = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

const parts = (m: Month) => m.split('-').map(Number) as [number, number];
export const nextMonth = (m: Month): Month => {
	const [y, mo] = parts(m);
	return mo === 12 ? `${y + 1}-01` : `${y}-${String(mo + 1).padStart(2, '0')}`;
};
const isDecember = (m: Month) => m.endsWith('-12');
export const shortMonth = (m: Month) => SHORT[parts(m)[1] - 1];
export const longMonth = (m: Month) => LONG[parts(m)[1] - 1];
/** "25 Oct 2026": transfers go out on payday, the 25th. */
export const transferDate = (m: Month, withYear = true) =>
	`25 ${shortMonth(m)}${withYear ? ` ${parts(m)[0]}` : ''}`;
/** "1 Jun 2027": the first of a month. */
export const firstOf = (m: Month) => `1 ${shortMonth(m)} ${parts(m)[0]}`;

export const euro = (n: number) =>
	new Intl.NumberFormat('en-IE', {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits: 0
	}).format(Math.round(n));

/** Payday months from `start`, skipping December if asked, up to `count` of them. */
function schedule(start: Month, count: number, skipDecember: boolean): Month[] {
	const out: Month[] = [];
	for (let m = start; out.length < count; m = nextMonth(m)) {
		if (!(skipDecember && isDecember(m))) out.push(m);
	}
	return out;
}

/** Payday months from `start` up to (not including) `deadline`. */
function available(start: Month, deadline: Month, skipDecember: boolean): Month[] {
	const out: Month[] = [];
	for (let m = start; m < deadline; m = nextMonth(m)) {
		if (!(skipDecember && isDecember(m))) out.push(m);
	}
	return out;
}

type Snapshot = {
	target: number;
	amount: number;
	startMonth: Month;
	skipDecember: boolean;
	deadline: Month;
};

const DEFAULTS: Snapshot = {
	target: 3000,
	amount: 375,
	startMonth: '2026-10',
	skipDecember: false,
	deadline: '2027-06'
};

export class Plan {
	target = $state(DEFAULTS.target);
	amount = $state(DEFAULTS.amount);
	startMonth = $state<Month>(DEFAULTS.startMonth);
	skipDecember = $state(DEFAULTS.skipDecember);
	/** Target date is the 1st of this month. */
	deadline = $state<Month>(DEFAULTS.deadline);
	status = $state<PlanStatus>('draft');
	/** The before → after line the AI shows after a change (info banner in ab-04). */
	note = $state<string | null>(null);
	/** The user's own messages inside the adjust sheet (ab-04--tight). */
	sheetMessages = $state<string[]>([]);

	transfers = $derived(Math.ceil(this.target / this.amount));
	months = $derived(schedule(this.startMonth, this.transfers, this.skipDecember));
	lastMonth = $derived(this.months[this.months.length - 1]);
	/** The day the target is reached: the 1st after the last transfer. */
	reachedOn = $derived(nextMonth(this.lastMonth));
	total = $derived(this.amount * this.transfers);
	onTime = $derived(this.reachedOn <= this.deadline);
	fit = $derived<Fit>(this.amount > SPARE_PER_MONTH ? 'tight' : 'comfortable');

	/** What it takes per month to make the deadline with the current dates, rounded up to €5. */
	neededAmount() {
		const n = available(this.startMonth, this.deadline, this.skipDecember).length;
		return Math.ceil(this.target / n / SLIDER.step) * SLIDER.step;
	}

	/** "Dec–May" */
	range = $derived(`${shortMonth(this.startMonth)}–${shortMonth(this.lastMonth)}`);

	/** The review's summary sentence (ab-05). */
	summary = $derived(
		`Move ${euro(this.amount)} from your current account to a new Holiday 2027 pot on the 25th of each month, ` +
			`${longMonth(this.startMonth)} to ${longMonth(this.lastMonth)}` +
			(this.skipDecember ? ', skipping December.' : '.')
	);

	/** The thread's one-line record of what changed in the sheet. */
	describe() {
		const bits = [`${euro(this.amount)}/month`];
		if (this.skipDecember) bits.push('skipping December');
		if (this.startMonth !== DEFAULTS.startMonth)
			bits.push(`starting in ${longMonth(this.startMonth)}`);
		if (this.deadline !== DEFAULTS.deadline) bits.push(`done by ${firstOf(this.deadline)}`);
		if (this.target !== DEFAULTS.target) bits.push(`target ${euro(this.target)}`);
		return `Changed to ${bits.join(', ')}`;
	}

	snapshot(): Snapshot {
		const { target, amount, startMonth, skipDecember, deadline } = this;
		return { target, amount, startMonth, skipDecember, deadline };
	}

	sameAs(s: Snapshot) {
		const now = this.snapshot();
		return (Object.keys(s) as (keyof Snapshot)[]).every((k) => now[k] === s[k]);
	}

	// ── Actions ────────────────────────────────────────────────────────────

	/** An option card in ab-03. */
	choose(amount: number) {
		Object.assign(this, { ...DEFAULTS, amount });
		this.note = null;
	}

	/** Dragging the slider. */
	setAmount(amount: number) {
		this.amount = amount;
		this.note = null;
	}

	/** The Skip December toggle: keep the date, re-work the amount. */
	setSkipDecember(on: boolean) {
		const was = this.amount;
		this.skipDecember = on;
		this.amount = this.neededAmount();
		this.note = `${on ? 'Skipping' : 'Not skipping'} December → ${euro(this.amount)}/month (was ${euro(was)}).`;
	}

	/** "What if I start in December?" typed into the sheet. */
	startInDecember(message: string) {
		this.sheetMessages.push(message);
		this.startMonth = '2026-12';
		this.skipDecember = false;
		this.amount = this.neededAmount();
		this.note = null;
	}

	/** A fix chip in ab-04--tight. */
	applyFix(fix: Fix) {
		const was = this.amount;
		Object.assign(this, fix.patch);
		// The question is answered; the sheet goes back to the plan (ab-04 default).
		this.sheetMessages = [];
		this.note = `${euro(was)} → ${euro(this.amount)}/month: ${fix.because}`;
	}

	approve() {
		this.status = 'approved';
	}

	reset() {
		Object.assign(this, DEFAULTS);
		this.status = 'draft';
		this.note = null;
		this.sheetMessages = [];
	}
}

export type Fix = { label: string; patch: Partial<Snapshot>; because: string };

/** The AI's fixes for a tight plan (conversation-script.md › ab-04.adjust--tight). */
export const FIXES: Fix[] = [
	{
		label: 'Start in Oct, skip Dec · €430/mo',
		patch: { startMonth: '2026-10', skipDecember: true, amount: 430 },
		because: 'starting in October, skipping December. Still on time for June.'
	},
	{
		label: 'Move to 1 Jul · €430/mo',
		patch: { deadline: '2027-07', amount: 430 },
		because: 'done by 1 July instead of 1 June.'
	},
	{
		label: 'Lower to €2,500 · €417/mo',
		patch: { target: 2500, amount: 417 },
		because: 'target lowered to €2,500. Still on time for June.'
	}
];

/** The three options in ab-03. */
export const OPTIONS = [
	{ title: 'Steady · recommended', detail: 'Done by June · ~€65 spare', amount: 375 },
	{ title: 'Relaxed', detail: '€3,000 by end of July', amount: 300 },
	{ title: 'Fast', detail: 'Done by April · nothing spare', amount: 440 }
];

export const plan = new Plan();
