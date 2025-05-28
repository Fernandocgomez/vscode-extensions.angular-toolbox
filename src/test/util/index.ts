import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';

export const ensureExtensionActivated = async (
	extensionId: string = 'fernandocgomez.gdlc-angular-toolbox',
) => {
	const extension = vscode.extensions.getExtension(extensionId);
	if (!extension) {
		throw new Error(`Extension "${extensionId}" not found. Ensure it's correctly defined.`);
	}

	if (!extension.isActive) {
		await extension.activate();
	}
};

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

export const cleanupSrcDirectory = async () => {
	const srcFolderPath = getSrcDirectoryPath();

	try {
		await fs.rm(srcFolderPath, { recursive: true, force: true });
	} catch (error) {
		if (error instanceof Error && 'code' in error && error.code !== 'ENOENT') {
			console.warn(`cleanup of ${srcFolderPath} encountered an issue: ${error.message}`);
		}
	}
};

export const makeSrcDirectory = async () => {
	const srcFolderPath = getSrcDirectoryPath();

	try {
		await fs.mkdir(srcFolderPath, { recursive: true });
	} catch (error) {
		console.warn(
			`Could not create ${srcFolderPath} (might already exist or other issue): ${error instanceof Error ? error.message : String(error)}`,
		);
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
