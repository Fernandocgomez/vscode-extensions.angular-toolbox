import * as vscode from 'vscode';

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
		vscode.window.showErrorMessage(
			errorMessage ? errorMessage : 'Error has occurred',
		);
		return null;
	}
};
