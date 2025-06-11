import * as vscode from 'vscode';

export const ensureExtensionActivated = async (
	extensionId: string = 'fernandocgomez.gdlc-angular-toolbox',
) => {
	const extension = vscode.extensions.getExtension(extensionId);
	if (!extension) {
		throw new Error(
			`Extension "${extensionId}" not found. Ensure it's correctly defined.`,
		);
	}

	if (!extension.isActive) {
		await extension.activate();
	}
};

export const createPromptStub = (sandbox: sinon.SinonSandbox) => {
	const actions: { type: string; response: string }[] = [];
	const showQuickPickStub = sandbox.stub(vscode.window, 'showQuickPick');
	const showInputBoxStub = sandbox.stub(vscode.window, 'showInputBox');

	const pipeline: any = {
		quickPick(response: string): typeof pipeline {
			actions.push({ type: 'showQuickPick', response });

			return this;
		},
		inputBox(response: string): typeof pipeline {
			actions.push({ type: 'showInputBox', response });

			return this;
		},
		apply(): void {
			actions
				.filter(a => a.type === 'showQuickPick')
				.map(a => a.response)
				.forEach((res, index) => {
					showQuickPickStub.onCall(index).resolves(res as any);
				});

			actions
				.filter(a => a.type === 'showInputBox')
				.map(a => a.response)
				.forEach((res, index) => {
					showInputBoxStub.onCall(index).resolves(res);
				});
		},
	};

	return pipeline;
};

export const executeCommand = async (command: string, path: vscode.Uri) => {
	try {
		await vscode.commands.executeCommand(command, path);
	} catch (err) {
		console.warn(
			`Command execution failed or was interrupted: ${err instanceof Error ? err.message : String(err)}`,
		);

		throw err;
	}
};
