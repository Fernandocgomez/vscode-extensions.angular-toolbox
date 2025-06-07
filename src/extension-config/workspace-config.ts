import * as vscode from 'vscode';

const CONFIGURATION_SECTION_ID = 'fernandocgomez.gdlc-angular-toolbox';
const PREFIX_KEY = 'prefix';

/**
 * Sets prefix configuration property in the workspace settings.
 */
export const setWorkspaceConfigProperty = async (
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
export const getWorkspaceConfigProperty = async (): Promise<
	string | undefined
> => {
	return await getWorkspaceConfig().get<string>(PREFIX_KEY);
};

/**
 * Checks if prefix is specifically set in the workspace settings config.
 */
export const hasWorkspaceConfigProperty = async (): Promise<boolean> => {
	return await getWorkspaceConfig().has(PREFIX_KEY);
};

const getWorkspaceConfig = () =>
	vscode.workspace.getConfiguration(CONFIGURATION_SECTION_ID);
