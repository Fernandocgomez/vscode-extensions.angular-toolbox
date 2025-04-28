export const kebabCaseToPascal = (kebabCaseInput: string): string => {
	// Split the input string by hyphens
	const words = kebabCaseInput.split('-');

	// Capitalize the first letter of each word
	const pascalCase = words
		.map(word => {
			// Handle empty strings in case of consecutive hyphens
			if (word.length === 0) return '';
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join('');

	return pascalCase;
};

export const isKebabCase = (text: string): boolean => {
	return /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(text);
};
