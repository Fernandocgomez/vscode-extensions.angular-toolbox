import * as sinon from 'sinon';
import * as vscode from 'vscode';
import * as assert from 'assert';
import {
	createPromptStub,
	deletePrefixFromConfig,
	getPrefixValue,
	makeSrcDirectory,
	removeSrcDirectory,
	setPrefixInWorkspaceConfig,
} from '../util';

suite('See Prefix', () => {
	let sandbox: sinon.SinonSandbox;
	const prefix = 'app-dashboard';

	setup(async () => {
		sandbox = sinon.createSandbox();

		await makeSrcDirectory();
		await deletePrefixFromConfig();
	});

	teardown(async () => {
		sandbox.restore();

		await removeSrcDirectory();
		await deletePrefixFromConfig();
	});

	suite(
		'when running the "gdlc-angular-toolbox.common-capabilities.see-prefix" command',
		() => {
			test('should display the current prefix value if the user previously provided one', async () => {
				await setPrefixInWorkspaceConfig(prefix);
				const showInformationMessageStub = sandbox.stub(
					vscode.window,
					'showInformationMessage',
				);

				await runCommand();

				assert.ok(
					showInformationMessageStub.calledWith(`Current prefix: "${prefix}"`),
					'Should call the showInformationMessage with the correct message',
				);
			});

			test('should display a warning message if the user has not provided a prefix before', async () => {
				const showWarningMessageStub = sandbox.stub(
					vscode.window,
					'showWarningMessage',
				);
				const showQuickPickStub = sandbox.stub(vscode.window, 'showQuickPick');
				showQuickPickStub.resolves('No' as any);

				await runCommand();

				assert.ok(
					showWarningMessageStub.calledWith('You have not set a prefix.'),
					'Should call the showWarningMessage with the correct message',
				);
			});

			test('should prompt the user to set the prefix if the user has not provided one before', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Do you want to register a prefix?"
					.inputBox(prefix) // 2. "Enter prefix (kebab-case)"
					.apply();

				await runCommand();

				assert.ok(
					getPrefixValue() === prefix,
					'Should set the prefix in the workspace config',
				);
			});
		},
	);
});

const runCommand = async () =>
	await vscode.commands.executeCommand(
		'gdlc-angular-toolbox.common-capabilities.see-prefix',
	);
