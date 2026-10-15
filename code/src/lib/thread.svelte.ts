// The thread on /plan: what has been said so far, appended from the script
// (conversation-script.md). No real AI: each turn is a timed reveal.
// Lives at module level so going Home and back keeps the conversation.
import { DURATION, wait } from './motion.svelte';
import { euro, plan, transferDate } from './plan.svelte';

export const INTENT =
	"I want to save €3,000 for a holiday next summer, but I don't know how much I can afford to save every month.";

export const STEPS = [
	'Looked at income · Jul–Sep',
	'Looked at regular bills',
	'Looked at 3 months of spending'
];

export type Item =
	| { id: number; type: 'user'; text: string }
	| { id: number; type: 'ai'; text: string }
	| { id: number; type: 'steps'; shown: number }
	| { id: number; type: 'cashflow' }
	| { id: number; type: 'assumptions' }
	| { id: number; type: 'options' }
	| { id: number; type: 'plan' }
	| { id: number; type: 'change'; text: string }
	| { id: number; type: 'goal' }
	| { id: number; type: 'nudge' };

type NewItem = Item extends infer T ? (T extends Item ? Omit<T, 'id'> : never) : never;

/** Which screen of the journey the thread is on, for `data-screen`. */
export type Stage = 'understand' | 'plan' | 'done';

class Thread {
	items = $state<Item[]>([]);
	stage = $state<Stage>('understand');
	busy = $state(false);
	#nextId = 0;
	#run = 0;

	get started() {
		return this.items.length > 0;
	}

	add(item: NewItem) {
		this.items.push({ ...item, id: this.#nextId++ } as Item);
	}

	remove(type: Item['type']) {
		this.items = this.items.filter((i) => i.type !== type);
	}

	/** ab-01 → ab-02 → ab-03: the user's message, the "work", then the plan. */
	async start(text = INTENT) {
		const run = ++this.#run;
		const live = () => run === this.#run;
		this.items = [];
		this.stage = 'understand';
		this.busy = true;
		plan.reset();

		this.add({ type: 'user', text });
		await wait(500);
		if (!live()) return;

		this.add({ type: 'steps', shown: 0 });
		const steps = this.items[this.items.length - 1] as Extract<Item, { type: 'steps' }>;
		for (let i = 1; i <= STEPS.length; i++) {
			await wait(DURATION.statusStep + 200);
			if (!live()) return;
			steps.shown = i;
		}

		await wait(DURATION.statusStep);
		if (!live()) return;
		this.add({
			type: 'ai',
			text: 'Goal: €3,000 by 1 June 2027. That’s 8 paydays.\nAfter bills and everyday spending, you usually have about €440 left each month.'
		});
		await wait(400);
		if (!live()) return;
		this.add({ type: 'cashflow' });
		await wait(500);
		if (!live()) return;
		this.add({ type: 'assumptions' });

		await wait(1400);
		if (!live()) return;
		this.stage = 'plan';
		this.add({
			type: 'ai',
			text: 'I’d put away €375 on each payday. You’d reach €3,000 by June and keep about €65 a month spare.'
		});
		await wait(400);
		if (!live()) return;
		this.add({ type: 'options' });
		await wait(300);
		if (!live()) return;
		this.add({ type: 'plan' });
		this.busy = false;
	}

	/** After approval (ab-06). */
	async approved() {
		const run = this.#run;
		this.stage = 'done';
		this.busy = true;
		await wait(300);
		if (run !== this.#run) return;
		const first = plan.months[0];
		this.add({
			type: 'ai',
			text: `Done. Your Holiday 2027 pot is set up. The first ${euro(plan.amount)} moves on ${transferDate(first, false)}, right after payday.`
		});
		await wait(300);
		if (run !== this.#run) return;
		this.add({ type: 'goal' });
		await wait(500);
		if (run !== this.#run) return;
		this.add({ type: 'ai', text: 'Want a nudge if a month looks tight before payday?' });
		await wait(200);
		if (run !== this.#run) return;
		this.add({ type: 'nudge' });
		this.busy = false;
	}

	async answerNudge(yes: boolean) {
		this.remove('nudge');
		this.add({ type: 'user', text: yes ? 'Yes, nudge me' : 'Not now' });
		await wait(500);
		this.add({
			type: 'ai',
			text: yes
				? 'OK. I’ll message you a few days before payday if your spending is running high. You can turn this off in the pot.'
				: 'OK. You can turn nudges on later, from the pot.'
		});
	}

	reset() {
		this.#run++;
		this.items = [];
		this.stage = 'understand';
		this.busy = false;
		plan.reset();
	}
}

export const thread = new Thread();
