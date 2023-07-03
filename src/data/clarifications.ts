export type ClarificationType = {
	sentence: string;
	explanation: string;
};

export type ExtendedClarificationType = ClarificationType & {
	translationIndexes?: number[];
	occurances?: string;
};

export const clarifications: ClarificationType[] = [
	{
		sentence: 'pom puat chi',
		explanation: 'I pain pee, means I need to pee'
	},
	{
		sentence: 'pom kin mangsaweerat',
		explanation: 'I eat vegan, means I am vegan'
	},
	{
		sentence: 'cheb',
		explanation: 'Hurt, means I am hurting, it hurts, ...'
	},
	{
		sentence: 'pom mi pan-ha kiaw-khab khaan pas-sawa',
		explanation: 'I have a urinary problem'
	},
	{
		sentence: 'khop-khun nah krab',
		explanation:
			'Thank you, yes! => The "nah krab" is a way to come over more polite, you can add it to nearly any sentence and seem more polite / higher educated.'
	}
];
