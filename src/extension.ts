import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('gdlc-angular-extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Angular Toolbox!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
