import { setWorkspaceConfigProperty } from '@extensionConfig';
import {
	promptInput,
	showInformationMessage,
	showWarningMessage,
} from '@extensionFramework';
import { isKebabCase } from '@utils';

export const registerPrefix = async () => {
	const prefix = await promptInput({
		prompt: 'Enter prefix (kebab-case)',
		placeHolder: 'e.g. app-dashboard',
		validationFn: value =>
			isKebabCase(value) ? null : 'Prefix must be in kebab-case format',
		errorMessage: 'Error collecting prefix',
	});

	if (prefix) {
		await setWorkspaceConfigProperty(prefix);

		showInformationMessage(`Prefix: "${prefix}" was set successfully.`);

		showWarningMessage(
			`Going forward, you will no longer be prompted to enter a prefix for components, pipes, directives, and other schematics. The prefix "${prefix}" will be used automatically.`,
		);
	} else {
		showWarningMessage('Prefix was not set.');
	}
};
