/**
 * Converts a kebab-case string to PascalCase.
 *
 * @param kebabCaseInput - The kebab-case string to convert.
 * @returns The PascalCase version of the string, or an empty string if the input is not a string.
 *
 * @example
 * kebabCaseToPascal('kebab-case-string'); // returns 'KebabCaseString'
 * kebabCaseToPascal('another-example');  // returns 'AnotherExample'
 * kebabCaseToPascal('');             // returns ''
 */
export const kebabCaseToPascal = (kebabCaseInput: string): string => {
	if (typeof kebabCaseInput !== 'string') {
		return '';
	}

	return kebabCaseInput
		.split('-')
		.map(word =>
			word.length === 0 ? '' : word.charAt(0).toUpperCase() + word.slice(1),
		)
		.join('');
};

/**
 * Checks if a string is in kebab-case.
 *
 * @param text - The string to check.
 * @returns `true` if the string is kebab-case, `false` otherwise.
 *
 * @example
 * isKebabCase('kebab-case-string'); // returns true
 * isKebabCase('another-example');  // returns true
 * isKebabCase('CamelCaseString'); // returns false
 * isKebabCase('with spaces');    // returns false
 */
export const isKebabCase = (text: string): boolean => {
	return /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(text);
};

/**
 * Checks if a string is in camelCase.
 *
 * @param str - The string to check.
 * @returns `true` if the string is camelCase, `false` otherwise.
 *
 * @example
 * isCamelCase('camelCaseString'); // returns true
 * isCamelCase('anotherExample');  // returns true
 * isCamelCase('camel');           // returns true
 * isCamelCase('simpleForAAAd');  // returns false
 * isCamelCase('KebabCaseString'); // returns false
 * isCamelCase('with spaces');    // returns false
 * isCamelCase('');             // returns false
 */
export const isCamelCase = (str: string): boolean => {
	if (!str || str.length === 0) {
		return false;
	}

	const initialPattern = /^[a-z][a-zA-Z0-9]*$/;
	if (!initialPattern.test(str)) {
		return false;
	}

	const consecutiveUppercasePattern = /[A-Z]{2,}/;
	if (consecutiveUppercasePattern.test(str)) {
		return false;
	}

	return true;
};

/**
 * Converts a camelCase string to kebab-case.
 *
 * @param camelCaseString - The camelCase string to convert.
 * @returns The kebab-case version of the string, or an empty string if the input is not a string.
 *
 * @example
 * toKebabCase('camelCaseString'); // returns 'camel-case-string'
 * toKebabCase('anotherExample');  // returns 'another-example'
 * toKebabCase('with spaces');    // returns 'with-spaces'
 */
export const camelCaseToKebabCase = (camelCaseString: string): string => {
	if (typeof camelCaseString !== 'string') {
		return '';
	}
	return camelCaseString
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/\s+/g, '-')
		.toLowerCase();
};

/**
 * Converts a kebab-case string to camelCase.
 *
 * @param kebabCaseInput - The kebab-case string to convert.
 * @returns The camelCase version of the string, or an empty string if the input is invalid.
 *
 * @example
 * kebabCaseToCamelCase('kebab-case-string'); // returns 'kebabCaseString'
 * kebabCaseToCamelCase('another-example');  // returns 'anotherExample'
 * kebabCaseToCamelCase('single');           // returns 'single'
 * kebabCaseToCamelCase('');                 // returns ''
 * kebabCaseToCamelCase('kebab--case');      // returns 'kebabCase' (handles multiple hyphens)
 */
export const kebabCaseToCamelCase = (kebabCaseInput: string): string => {
	if (typeof kebabCaseInput !== 'string' || !kebabCaseInput.trim()) {
		return '';
	}

	return kebabCaseInput
		.split('-')
		.map((word, index) => {
			if (index === 0) {
				return word.toLowerCase();
			}
			if (!word) {
				return '';
			}
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		})
		.join('');
};
