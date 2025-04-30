import * as vscode from 'vscode';

export const openTextFile = async (filePath: string): Promise<void> => {
	await vscode.window.showTextDocument(await vscode.workspace.openTextDocument(filePath));
};

/**
 * Get the user roo path.
 * Throws an exception if the extension does not have access to read user files.
 */
export const getUserRootPath = (): string => {
	const workspaceFolders = vscode.workspace.workspaceFolders;

	if (workspaceFolders && workspaceFolders.length > 0) {
		return workspaceFolders[0].uri.fsPath;
	}

	throw new Error('Not able to access user root path.');
};
