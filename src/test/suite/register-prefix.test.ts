import * as sinon from 'sinon';
import * as vscode from 'vscode';
import * as assert from 'assert';
import {
	createPromptStub,
	makeSrcDirectory,
	removeSrcDirectory,
} from '../util';

suite('Register Prefix', () => {
	let sandbox: sinon.SinonSandbox;

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
		'when running the "gdlc-angular-toolbox.common-capabilities.register-prefix" command',
		() => {
			test('should register the prefix when the user input a value', async () => {
				createPromptStub(sandbox)
					.inputBox('app-dashboard') // 1. "Enter prefix (kebab-case)"
					.apply();

				await runCommand();

				assert.strictEqual(getPrefixValue(), 'app-dashboard');
			});

			test('should not set the prefix when the user input an empty value', async () => {
				createPromptStub(sandbox)
					.inputBox('') // 1. "Enter prefix (kebab-case)"
					.apply();

				await runCommand();

				assert.strictEqual(getPrefixValue(), '');
			});

			test('should display a confirm message when the user set the prefix', async () => {
				const prefix = 'app-dashboard';
				const showInformationMessageStub = sandbox.stub(
					vscode.window,
					'showInformationMessage',
				);
				createPromptStub(sandbox)
					.inputBox(prefix) // 1. "Enter prefix (kebab-case)"
					.apply();

				await runCommand();

				assert.ok(
					showInformationMessageStub.calledWith(
						`Prefix: "${prefix}" was set successfully.`,
					),
					'Should call the showInformationMessage once with the correct message',
				);
			});

			test('should display a warning message when the user set the prefix', async () => {
				const prefix = 'app-dashboard';
				const showWarningMessageStub = sandbox.stub(
					vscode.window,
					'showWarningMessage',
				);
				createPromptStub(sandbox)
					.inputBox(prefix) // 1. "Enter prefix (kebab-case)"
					.apply();

				await runCommand();

				assert.ok(
					showWarningMessageStub.calledWith(
						`Going forward, you will no longer be prompted to enter a prefix for components, pipes, directives, and other schematics. The prefix "${prefix}" will be used automatically.`,
					),
					'Should call the showWarningMessage once with the correct message',
				);
			});
		},
	);
});

const CONFIGURATION_SECTION_ID = 'fernandocgomez.gdlc-angular-toolbox';

const getWorkspaceConfig = () =>
	vscode.workspace.getConfiguration(CONFIGURATION_SECTION_ID);

const deletePrefixFromConfig = async () =>
	await getWorkspaceConfig().update(
		'prefix',
		'',
		vscode.ConfigurationTarget.Workspace,
	);

const getPrefixValue = () => getWorkspaceConfig().get<string>('prefix');

const runCommand = async () =>
	await vscode.commands.executeCommand(
		'gdlc-angular-toolbox.common-capabilities.register-prefix',
	);
