export const kebabCaseToPascal = (kebabCaseInput: string): string => {
	return kebabCaseInput
		.split('-')
		.map(word => (word.length === 0 ? '' : word.charAt(0).toUpperCase() + word.slice(1)))
		.join('');
};

export const isKebabCase = (text: string): boolean => {
	return /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(text);
};
