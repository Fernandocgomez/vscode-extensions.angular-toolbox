import { generateComponent, generateService } from '@commonCapabilities';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const generateComponentDisposable = vscode.commands.registerCommand(
		'gdlc-angular-toolbox.common-capabilities.generate-component',
		async (arg: vscode.Uri) => {
			await generateComponent(arg.fsPath);
		},
	);

	const generateServiceDisposable = vscode.commands.registerCommand(
		'gdlc-angular-toolbox.common-capabilities.generate-service',
		async (arg: vscode.Uri) => {
			await generateService(arg.fsPath);
		},
	);

	context.subscriptions.push(generateComponentDisposable, generateServiceDisposable);
}

export function deactivate() {}
