import * as vscode from 'vscode';

export const showErrorMessage = (message?: string): void => {
	vscode.window.showErrorMessage(message ? message : 'Error has occurred.');
};

export const showInformationMessage = (message?: string): void => {
	vscode.window.showInformationMessage(
		message ? message : 'Message was not provided.',
	);
};

export const showWarningMessage = (message?: string): void => {
	vscode.window.showWarningMessage(
		message ? message : 'Message was not provided.',
	);
};
