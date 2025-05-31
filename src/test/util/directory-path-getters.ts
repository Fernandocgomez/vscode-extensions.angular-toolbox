import * as vscode from 'vscode';
import * as path from 'path';

export const getWorkspaceRootDir = (): string => {
	if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
		throw new Error(
			"No workspace folder open. Please open a project for testing this extension's commands.",
		);
	}

	return vscode.workspace.workspaceFolders[0].uri.fsPath;
};

export const getSrcDirectoryPath = (): string => {
	return path.join(getWorkspaceRootDir(), 'src');
};

export const getAngularCustomTemplatesDirectoryPath = (): string => {
	return path.join(getWorkspaceRootDir(), '.angular-custom-templates');
};
