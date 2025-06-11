import * as sinon from 'sinon';
import * as vscode from 'vscode';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import {
	assertItDoesNotExists,
	assertItExists,
	assertStrictEqual,
	createConfig,
	createPromptStub,
	createTemplateFile,
	deletePrefixFromConfig,
	executeCommand,
	getSrcDirectoryPath,
	makeAngularCustomTemplatesDirectory,
	makeSrcDirectory,
	removeAngularCustomTemplatesDirectory,
	removeSrcDirectory,
	setPrefixInWorkspaceConfig,
} from '../util';
import {
	customTemplatePipeFixture,
	pipeSpecFixture,
	pipeSpecWithoutPrefixFixture,
	pipeWithoutPrefixFixture,
	pipeWithPrefixFixture,
	customPipeTemplateTestingData,
} from './fixtures';

suite('Generate Pipe', () => {
	let sandbox: sinon.SinonSandbox;

	setup(async () => {
		sandbox = sinon.createSandbox();

		await makeSrcDirectory();
	});

	teardown(async () => {
		sandbox.restore();

		await removeSrcDirectory();
	});

	suite(
		'when running the "gdlc-angular-toolbox.common-capabilities.generate-pipe" command',
		() => {
			test('should generate a pipe file and spec file if the user select "Yes" to the question "Do you want to generate the spec file?"', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Do you want to prefix your pipe selector?"
					.inputBox('prefix') // 2. "Enter pipe prefix (camel-case)"
					.inputBox('formatNumber') // 3. "Enter pipe name (camel-case)"
					.apply();

				await runCommand();

				const pipePath = path.join(
					getSrcDirectoryPath(),
					'format-number.pipe.ts',
				);
				const specPath = path.join(
					getSrcDirectoryPath(),
					'format-number.pipe.spec.ts',
				);
				assertItExists(pipePath, `Pipe file should exist at ${pipePath}`);
				assertItExists(specPath, `Spec file should exist at ${specPath}`);
				assertStrictEqual(
					pipePath,
					pipeWithPrefixFixture,
					'Generated pipe content does not match fixture',
				);
				assertStrictEqual(
					specPath,
					pipeSpecFixture,
					'Generated spec content does not match fixture',
				);
			});

			test('should generate a pipe file without prefix and spec file if the user select "No" to the question "Do you want to prefix your pipe selector?"', async () => {
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Do you want to prefix your pipe selector?"
					.inputBox('formatDate') // 2. "Enter pipe name (camel-case)"
					.apply();

				await runCommand();

				const pipePath = path.join(
					getSrcDirectoryPath(),
					'format-date.pipe.ts',
				);
				const specPath = path.join(
					getSrcDirectoryPath(),
					'format-date.pipe.spec.ts',
				);
				assertItExists(pipePath, `Pipe file should exist at ${pipePath}`);
				assertItExists(specPath, `Spec file should exist at ${specPath}`);
				assertStrictEqual(
					pipePath,
					pipeWithoutPrefixFixture,
					'Generated pipe content does not match fixture.',
				);
				assertStrictEqual(
					specPath,
					pipeSpecWithoutPrefixFixture,
					'Generated spec content does not match fixture.',
				);
			});

			test('should generate a pipe file using the custom template if the user has a pipe template on the .angular-custom-templates folder', async () => {
				await makeAngularCustomTemplatesDirectory();
				await createTemplateFile('pipe', customPipeTemplateTestingData);
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Do you want to prefix your pipe selector?"
					.inputBox('dummy') // 2. "Enter pipe name (camel-case)"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'dummy.pipe.ts'),
					customTemplatePipeFixture,
					'Generated pipe content does not match fixture.',
				);

				await removeAngularCustomTemplatesDirectory();
			});

			test('should show an error message if there is already an existent pipe with the same name on the directory', async () => {
				fs.writeFileSync(
					path.join(getSrcDirectoryPath(), 'dummy.pipe.ts'),
					'dummy content',
				);
				const showErrorMessageStub = sandbox.stub(
					vscode.window,
					'showErrorMessage',
				);
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Do you want to prefix your pipe selector?"
					.inputBox('dummy') // 2. "Enter pipe name (camel-case)"
					.apply();

				await runCommand();

				assert.ok(
					showErrorMessageStub.calledOnce,
					'Should call the showErrorMessage function once',
				);
			});

			suite('and the user provider a custom config', () => {
				test('should not generate the spec file if the config skipSpec is true', async () => {
					await makeAngularCustomTemplatesDirectory();
					await createConfig({
						pipe: {
							skipSpec: true,
						},
					});

					createPromptStub(sandbox)
						.quickPick('No') // 1. "Do you want to prefix your pipe selector?"
						.inputBox('dummy') // 2. "Enter pipe name (camel-case)"
						.apply();

					await runCommand();

					const specPath = path.join(
						getSrcDirectoryPath(),
						'dummy.pipe.spec.ts',
					);
					assertItDoesNotExists(
						specPath,
						`Pipe spec file should not exist at ${specPath}`,
					);
					await removeAngularCustomTemplatesDirectory();
				});

				test('should not ask the user to collect the prefix if the config skipPrefix is true', async () => {
					await makeAngularCustomTemplatesDirectory();
					await createConfig({
						skipPrefix: true,
					});
					const showInputBoxStub = sandbox.stub(vscode.window, 'showInputBox');
					showInputBoxStub.resolves('dummy');

					await runCommand();

					assert.ok(
						showInputBoxStub.calledOnce,
						'Should call the showQuickPick function once',
					);
					await removeAngularCustomTemplatesDirectory();
				});
			});

			suite(
				'and the user has already provide a prefix on the workspace config',
				() => {
					test('should not ask the the user to collect the prefix and should use the one saved on the workspace config', async () => {
						await setPrefixInWorkspaceConfig('prefix');
						const showInputBoxStub = sandbox.stub(
							vscode.window,
							'showInputBox',
						);
						showInputBoxStub.resolves('formatNumber');

						await runCommand();

						assert.ok(
							showInputBoxStub.calledOnce,
							'Should call the showInputBox function once',
						);
						assertStrictEqual(
							path.join(getSrcDirectoryPath(), 'format-number.pipe.ts'),
							pipeWithPrefixFixture,
							'Generated directive content does not match fixture.',
						);
						await deletePrefixFromConfig();
					});
				},
			);
		},
	);
});

const runCommand = async () => {
	await executeCommand(
		'gdlc-angular-toolbox.common-capabilities.generate-pipe',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};
