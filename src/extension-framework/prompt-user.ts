import * as vscode from 'vscode';

/**
 * Prompts the user for input using VS Code's input box with optional validation.
 *
 * @async
 * @function promptInput
 * @param {Object} config - Configuration options for the input prompt
 * @param {string} config.prompt - The prompt text shown to the user
 * @param {string} config.placeHolder - Placeholder text displayed in the input field
 * @param {Function} [config.validationFn] - Optional validation function that takes user input
 *                                          and returns an error message string or null if valid
 * @param {string} [config.errorMessage] - Custom error message when input is canceled or invalid
 * @returns {Promise<string|null>} - A promise that resolves to the user's input or null
 * @throws {Error} - Throws an error if the user cancels the input or provides invalid input
 *
 * @example
 * // Basic usage
 * const name = await promptInput({
 *   prompt: "Enter component name",
 *   placeHolder: "MyComponent"
 * });
 *
 * @example
 * // With validation
 * const name = await promptInput({
 *   prompt: "Enter component name",
 *   placeHolder: "MyComponent",
 *   validationFn: (input) => /^[A-Z][a-zA-Z0-9]*$/.test(input) ? null : "Component name must start with uppercase letter",
 *   errorMessage: "Component name is required"
 * });
 */
export const promptInput = async (config: {
	prompt: string;
	placeHolder: string;
	validationFn?: (userInput: string) => string | null;
	errorMessage?: string;
}): Promise<string> => {
	const { prompt, placeHolder, validationFn, errorMessage } = config;

	const componentName = await vscode.window.showInputBox({
		prompt,
		placeHolder,
		validateInput: validationFn,
	});

	if (!componentName) {
		throw new Error(errorMessage ? errorMessage : 'Please input a valid value.');
	}

	return componentName;
};

/**
 * Prompts the user with a boolean choice using two custom options
 *
 * @param {Object} config - Configuration object for the prompt
 * @param {string} config.prompt - The question or prompt to display to the user
 * @param {[string, string]} config.options - Array of two string options where the first option [0] represents true and the second option [1] represents false
 *
 * @returns {Promise<boolean|null>} Returns true if the user selected the first option,
 *                                  false if the user selected the second option,
 *
 * @throws {Error} - throw an exception if the user canceled the selection
 * @example
 * // Basic usage with Yes/No
 * const result = await promptBoolean({
 *   prompt: 'Skip spec file?',
 *   options: ['Yes', 'No']
 * });
 *
 * @example
 * // Custom options
 * const result = await promptBoolean({
 *   prompt: 'Include routing?',
 *   options: ['Include', 'Skip']
 * });
 */
export const promptBoolean = async (config: {
	prompt: string;
	options: [string, string];
}): Promise<boolean> => {
	const { prompt, options } = config;

	const result = await vscode.window.showQuickPick(options, {
		placeHolder: prompt,
		canPickMany: false,
	});

	if (result === undefined) {
		throw new Error(`A selection should be made.`);
	}

	return result === options[0];
};
