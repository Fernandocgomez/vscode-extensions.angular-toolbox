import { generateComponent } from '@commonCapabilities';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const generateComponentDisposable = vscode.commands.registerCommand(
		'gdlc-angular-toolbox.common-capabilities.generate-component',
		async (arg: vscode.Uri) => {
			await generateComponent(arg.fsPath);
		},
	);

	context.subscriptions.push(generateComponentDisposable);
}

export function deactivate() {}
