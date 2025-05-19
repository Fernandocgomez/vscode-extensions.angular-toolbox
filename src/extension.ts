import { generateComponent, generatePipe, generateService } from '@commonCapabilities';
import { showErrorMessage } from '@extensionFramework';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const generateComponentDisposable = vscode.commands.registerCommand(
		'gdlc-angular-toolbox.common-capabilities.generate-component',
		async (arg: vscode.Uri) => {
			try {
				await generateComponent(arg.fsPath);
			} catch (error: any) {
				showErrorMessage(error.message);
			}
		},
	);

	const generateServiceDisposable = vscode.commands.registerCommand(
		'gdlc-angular-toolbox.common-capabilities.generate-service',
		async (arg: vscode.Uri) => {
			try {
				await generateService(arg.fsPath);
			} catch (error: any) {
				showErrorMessage(error.message);
			}
		},
	);

	const generatePipeDisposable = vscode.commands.registerCommand(
		'gdlc-angular-toolbox.common-capabilities.generate-pipe',
		async (arg: vscode.Uri) => {
			try {
				await generatePipe(arg.fsPath);
			} catch (error: any) {
				showErrorMessage(error.message);
			}
		},
	);

	context.subscriptions.push(
		generateComponentDisposable,
		generateServiceDisposable,
		generatePipeDisposable,
	);
}

export function deactivate() {}
