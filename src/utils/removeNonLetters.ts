export function removeNonLetters(str: string) {
	return str.replace(/[^a-zA-Z]/g, '');
}
