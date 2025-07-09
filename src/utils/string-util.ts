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
const kebabCaseToPascal = (kebabCaseInput: string): string => {
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

/**
 * Checks if a string is in PascalCase.
 *
 * @param str - The string to check.
 * @returns `true` if the string is PascalCase, `false` otherwise.
 *
 * @example
 * isPascalCase('PascalCaseString'); // returns true
 * isPascalCase('AnotherExample');  // returns true
 * isPascalCase('Pascal');           // returns true
 * isPascalCase('camelCaseString'); // returns false
 * isPascalCase('kebab-case-string'); // returns false
 * isPascalCase('');             // returns false
 */
export const isPascalCase = (str: string): boolean => {
	if (!str || str.length === 0) {
		return false;
	}

	// Must start with an uppercase letter, followed by letters or digits
	const initialPattern = /^[A-Z][a-zA-Z0-9]*$/;
	if (!initialPattern.test(str)) {
		return false;
	}

	// Disallow consecutive uppercase letters (e.g., "MyAPI")
	const consecutiveUppercasePattern = /[A-Z]{2,}/;
	if (consecutiveUppercasePattern.test(str)) {
		return false;
	}

	return true;
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
 * Converts a string from camelCase, kebab-case, or PascalCase to kebab-case.
 *
 * @param inputString - The string to convert.
 * @returns The kebab-case version of the string.
 */
export const toKebabCase = (inputString: string): string => {
	if (isKebabCase(inputString)) {
		return inputString;
	}
	if (isCamelCase(inputString)) {
		return camelCaseToKebabCase(inputString);
	}
	if (isPascalCase(inputString)) {
		return camelCaseToKebabCase(
			inputString.charAt(0).toLowerCase() + inputString.slice(1),
		);
	}

	return inputString;
};

export const toPascalCase = (inputString: string): string => {
	if (isPascalCase(inputString)) {
		return inputString;
	}
	if (isKebabCase(inputString)) {
		return kebabCaseToPascal(inputString);
	}
	if (isCamelCase(inputString)) {
		return inputString.charAt(0).toUpperCase() + inputString.slice(1);
	}

	return inputString;
};

export const toCamelCase = (inputString: string): string => {
	if (isCamelCase(inputString)) {
		return inputString;
	}
	if (isKebabCase(inputString)) {
		return kebabCaseToCamelCase(inputString);
	}
	if (isPascalCase(inputString)) {
		return inputString.charAt(0).toLowerCase() + inputString.slice(1);
	}

	return inputString;
};
