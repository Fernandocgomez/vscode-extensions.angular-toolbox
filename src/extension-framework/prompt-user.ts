import * as vscode from 'vscode';
import { showErrorMessage } from './messages';

export const promptInput = async (config: {
	prompt: string;
	placeHolder: string;
	validationFn?: (userInput: string) => string | null;
	errorMessage?: string;
}): Promise<string | null> => {
	const { prompt, placeHolder, validationFn, errorMessage } = config;
	try {
		const componentName = await vscode.window.showInputBox({
			prompt,
			placeHolder,
			validateInput: validationFn,
		});

		if (!componentName) {
			return null;
		}

		return componentName;
	} catch (error) {
		showErrorMessage(errorMessage);

		return null;
	}
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
 *                                  or null if the user canceled the selection
 *
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
}) => {
	const { prompt, options } = config;

	const result = await vscode.window.showQuickPick(options, {
		placeHolder: prompt,
		canPickMany: false,
	});

	if (result === undefined) {
		return null;
	}

	return result === options[0];
};
