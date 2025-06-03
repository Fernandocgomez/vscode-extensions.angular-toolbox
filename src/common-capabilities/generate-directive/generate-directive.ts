import { promptBoolean, promptInput } from '@extensionFramework';
import { isCamelCase } from '@utils';

/**
 * @param folderRightClickedPath /home/fernando/test/src/app
 */
export const generateDirective = async (folderRightClickedPath: string): Promise<void> => {
	const needPrefix = await promptBoolean({
		prompt: 'Do you want to prefix your directive selector?',
		options: ['Yes', 'No'],
	});

	const prefix = needPrefix ? await promptForPrefix() : null;
	const nameInCamelCase = await promptForName();
};

const promptForPrefix = async (): Promise<string | null> => {
	return await promptInput({
		prompt: 'Enter directive prefix (camel-case)',
		placeHolder: 'e.g. app',
		validationFn: value =>
			isCamelCase(value) ? null : 'Directive prefix must be in camel-case format',
		errorMessage: 'Error collecting directive prefix',
	});
};

const promptForName = async (): Promise<string> => {
	return await promptInput({
		prompt: 'Enter directive name (camel-case)',
		placeHolder: 'e.g. highlightOnHover',
		validationFn: value =>
			isCamelCase(value) ? null : 'Directive name must be in camel-case format',
		errorMessage: 'Error collecting directive name',
	});
};
