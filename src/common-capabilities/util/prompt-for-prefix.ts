import {
	getExtensionJsonBaseConfigService,
	getPrefixValueFromWorkspaceConfig,
	isPrefixSetInWorkspaceConfig,
} from '@extensionConfig';
import { promptBoolean, promptInput } from '@extensionFramework';
import { kebabCaseToCamelCase } from '@utils';

export const promptForPrefix = async (
	validationFn: (value: string) => string | null,
): Promise<string | null> => {
	if (getExtensionJsonBaseConfigService().skipPrefix()) {
		return null;
	}

	if (await isPrefixSetInWorkspaceConfig()) {
		const prefix = (await getPrefixValueFromWorkspaceConfig()) as string;

		return validationFn(prefix) === null
			? prefix
			: kebabCaseToCamelCase(prefix);
	}

	const needSelectorPrefix = await promptBoolean({
		prompt: 'Do you want to prefix it?',
		options: ['Yes', 'No'],
	});

	return needSelectorPrefix
		? await promptInput({
				prompt: 'Enter prefix',
				placeHolder: `e.g. ${validationFn('app-dashboard') === null ? 'app-dashboard' : kebabCaseToCamelCase('app-dashboard')}`,
				validationFn,
				errorMessage: 'Error collecting prefix',
			})
		: null;
};
