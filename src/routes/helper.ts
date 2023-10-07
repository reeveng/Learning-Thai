import type { ClarificationType, ExtendedClarificationType } from '$data/clarifications';

import type { TranslationType } from '$data/translations';
import { humanReadableIndex } from '$utils/humanReadableIndex';
import { removeNonLetters } from '$utils/removeNonLetters';

export const addOccurancesToClarification = (
	clarifications: ClarificationType[],
	translations: TranslationType[]
): ExtendedClarificationType[] => {
	const extendedClarifications: ExtendedClarificationType[] = clarifications;

	// Iterate over the sorted clarifications and add translation information
	extendedClarifications.forEach((clarification) => {
		const sentence = removeNonLetters(clarification.sentence);
		const matchingTranslations = translations.filter((translation) => {
			const exampleSentence = removeNonLetters(translation.example).toLowerCase();
			const stringToClarify = sentence.toLowerCase();

			return exampleSentence.includes(stringToClarify);
		});
		const translationIndexes = matchingTranslations.map((translation) =>
			humanReadableIndex(translations.indexOf(translation))
		);

		clarification.translationIndexes = translationIndexes;
	});

	extendedClarifications.sort((a, b) => {
		if (a.translationIndexes && b.translationIndexes) {
			const firstIndexA = a.translationIndexes[0];
			const firstIndexB = b.translationIndexes[0];
			return firstIndexA - firstIndexB;
		}
		// Handle cases where either a.occurances or b.occurances is undefined or empty
		// Adjust the comparison logic based on your requirements
		return 0;
	});

	extendedClarifications.map((clarification) => {
		if (clarification.translationIndexes) {
			clarification.occurances = groupIndexes(clarification.translationIndexes);
		}

		delete clarification.translationIndexes;

		return clarification;
	});

	return extendedClarifications;
};

function groupIndexes(translationIndexes: number[]): string {
	// Sort the translation indexes in ascending order
	translationIndexes.sort((a, b) => a - b);

	// Group the translation indexes
	const groupedIndexes = [];
	let start = translationIndexes[0];
	let end = translationIndexes[0];

	for (let i = 1; i < translationIndexes.length; i++) {
		if (translationIndexes[i] === end + 1) {
			end = translationIndexes[i];
		} else {
			if (start !== end) {
				groupedIndexes.push(`${start}-${end}`);
			} else {
				groupedIndexes.push(`${start}`);
			}
			start = translationIndexes[i];
			end = translationIndexes[i];
		}
	}

	// Handle the last group
	if (start !== end) {
		groupedIndexes.push(`${start}-${end}`);
	} else {
		groupedIndexes.push(`${start}`);
	}

	// Join the grouped indexes with commas
	const groupedIndexesString = groupedIndexes.join(', ');

	return groupedIndexesString;
}
