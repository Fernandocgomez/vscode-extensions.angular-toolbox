import * as vscode from 'vscode';

const CONFIGURATION_SECTION_ID = 'fernandocgomez.angular-toolbox';
const PREFIX_KEY = 'prefix';

/**
 * Sets prefix configuration property in the workspace settings.
 */
export const setPrefixInWorkspaceConfig = async (
	value: string,
): Promise<void> => {
	await getWorkspaceConfig().update(
		PREFIX_KEY,
		value,
		vscode.ConfigurationTarget.Workspace,
	);
};

/**
 * Gets prefix configuration property in the workspace settings.
 */
export const getPrefixValueFromWorkspaceConfig = async (): Promise<
	string | null
> => {
	return (await getWorkspaceConfig().get<string>(PREFIX_KEY)) ?? null;
};

/**
 * Checks if prefix is set in the workspace config and is not an empty string.
 */
export const isPrefixSetInWorkspaceConfig = async (): Promise<boolean> => {
	const prefixValue = await getPrefixValueFromWorkspaceConfig();

	return typeof prefixValue === 'string' && prefixValue.trim() !== '';
};

const getWorkspaceConfig = () =>
	vscode.workspace.getConfiguration(CONFIGURATION_SECTION_ID);
