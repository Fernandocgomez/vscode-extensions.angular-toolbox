import {
	getExtensionJsonBaseConfigService,
	getPrefixValueFromWorkspaceConfig,
	isPrefixSetInWorkspaceConfig,
} from '@extensionConfig';
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

	return null;
};
