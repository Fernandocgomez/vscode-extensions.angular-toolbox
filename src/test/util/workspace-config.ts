import * as vscode from 'vscode';

const CONFIGURATION_SECTION_ID = 'fernandocgomez.angular-toolbox';
const PREFIX_KEY = 'prefix';

export const getWorkspaceConfig = () =>
	vscode.workspace.getConfiguration(CONFIGURATION_SECTION_ID);

export const deletePrefixFromConfig = async () =>
	await getWorkspaceConfig().update(
		'prefix',
		'',
		vscode.ConfigurationTarget.Workspace,
	);

export const getPrefixValue = () => getWorkspaceConfig().get<string>('prefix');

export const setPrefixInWorkspaceConfig = async (
	value: string,
): Promise<void> => {
	await getWorkspaceConfig().update(
		PREFIX_KEY,
		value,
		vscode.ConfigurationTarget.Workspace,
	);
};
