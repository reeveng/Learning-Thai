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
		explanation: 'I pain pee, means I need to pee.'
	},
	{
		sentence: 'pom kin mangsaweerat',
		explanation: 'I eat vegan, means I am vegan.'
	},
	{
		sentence: 'cheb',
		explanation: 'Hurt => means I am hurting, it hurts, ...'
	},
	{
		sentence: 'pom mi pan-ha kiaw-khab khaan pas-sawa',
		explanation: 'I have a urinary problem.'
	},
	{
		sentence: 'khop-khun nah krab',
		explanation:
			'Thank you, yes! => The "nah krab" is a way to come over more polite, you can add it to nearly any sentence and seem more polite / higher educated.'
	},
	{
		sentence: 'pom khun su-waii maak',
		explanation: 'Your hair is very beautiful.'
	},
	{
		sentence: 'tam araii yu?',
		explanation:
			'What are you doing? => yu, means "at the moment" / "currently" / "in the present", in English "-ing" is added to represent an action that is currently going on.'
	},
	{
		sentence: 'rak pom, mai?',
		explanation:
			'love me, right/not? => do you love me? => "mai" is used here to ask a question, when "mai" comes at the end, most of the time it means someone is asking something.'
	},
	{
		sentence: 'kin khaw',
		explanation: `eat rice => eat a meal => in Thai, since rice is a common phenomenon, they use "eat rice" as "eat a meal" / "lets eat" / "eat breakfast" / "eat lunch" / "eat dinner" => sort of used instead of "eat" in general, but only main meals and doesn't apply to snacks, desert, ...`
	},
	{
		sentence: 'kin khaw ma ruuuwe yang',
		explanation: 'Eat rice come or yet? => Did you eat before coming here?'
	},
	{
		sentence: 'one nee',
		explanation: 'Day this => today'
	},
	{
		sentence: 'pom poot thai dai',
		explanation: 'I speak thai can => I can speak Thai.'
	},
	{
		sentence: 'farang ki nok',
		explanation: `foreigner shit bird => foreinger that is a cheap skate, "farang ki nok" is a slur often used to refer to foreigners who do not want to spend any money or foreigners that are extremely (abnormally) cheap, or used to refer to white trash, e.g.: A foreigner that trying to get a discount for something that is very cheap already`
	}
];
// ,{
// 	sentence: '',
// 	explanation: ''
// }
