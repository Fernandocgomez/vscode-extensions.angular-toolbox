import {
	getPrefixValueFromWorkspaceConfig,
	isPrefixSetInWorkspaceConfig,
} from '@extensionConfig';
import {
	promptBoolean,
	showInformationMessage,
	showWarningMessage,
} from '@extensionFramework';
import { registerPrefix } from './register-prefix';

export const seePrefix = async () => {
	if (await isPrefixSetInWorkspaceConfig()) {
		showInformationMessage(
			`Current prefix: "${await getPrefixValueFromWorkspaceConfig()}"`,
		);
	} else {
		showWarningMessage('You have not set a prefix.');

		if (
			await promptBoolean({
				prompt: 'Do you want to register a prefix?',
				options: ['Yes', 'No'],
			})
		) {
			await registerPrefix();
		}
	}
};
