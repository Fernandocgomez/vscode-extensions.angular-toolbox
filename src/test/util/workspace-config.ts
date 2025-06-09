import * as vscode from 'vscode';

export const CONFIGURATION_SECTION_ID = 'fernandocgomez.gdlc-angular-toolbox';

export const getWorkspaceConfig = () =>
	vscode.workspace.getConfiguration(CONFIGURATION_SECTION_ID);

export const deletePrefixFromConfig = async () =>
	await getWorkspaceConfig().update(
		'prefix',
		'',
		vscode.ConfigurationTarget.Workspace,
	);

export const getPrefixValue = () => getWorkspaceConfig().get<string>('prefix');
