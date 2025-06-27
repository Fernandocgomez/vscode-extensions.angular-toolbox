import * as sinon from 'sinon';
import * as vscode from 'vscode';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import {
	assertItDoesNotExists,
	assertStrictEqual,
	createConfig,
	createPromptStub,
	createTemplateFile,
	deletePrefixFromConfig,
	executeCommand,
	getSrcDirectoryPath,
	makeAngularToolboxDirectory,
	makeSrcDirectory,
	removeAngularCustomTemplatesDirectory,
	removeSrcDirectory,
	setPrefixInWorkspaceConfig,
} from '../util';
import {
	customTemplatePipeFixture,
	pipeSpecFixture,
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
		'when running the "angular-toolbox.common-capabilities.generate-pipe" command',
		() => {
			test('should generate a pipe file and spec file"', async () => {
				createPromptStub(sandbox)
					.inputBox('formatNumber') // 3. "Enter pipe name (camel-case)"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'format-number.pipe.ts'),
					pipeWithoutPrefixFixture,
					'Generated pipe content does not match fixture',
				);
				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'format-number.pipe.spec.ts'),
					pipeSpecFixture,
					'Generated spec content does not match fixture',
				);
			});

			test('should generate a pipe file using the custom template if the user provides it', async () => {
				await makeAngularToolboxDirectory();
				await createTemplateFile('pipe', customPipeTemplateTestingData);
				createPromptStub(sandbox)
					.inputBox('dummy') // "Enter pipe name (camel-case)"
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
					.inputBox('dummy') // "Enter pipe name (camel-case)"
					.apply();

				await runCommand();

				assert.ok(
					showErrorMessageStub.calledOnce,
					'Should call the showErrorMessage function once',
				);
			});

			suite('and the user provider a custom config', () => {
				test('should not generate the spec file if the config skipSpec is true', async () => {
					await makeAngularToolboxDirectory();
					await createConfig({
						skipSpec: true,
					});
					createPromptStub(sandbox)
						.inputBox('dummy') // "Enter pipe name (camel-case)"
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

				test('should not prefix the pipe if the config skipPrefix is true even if the user has already provide a prefix in its workspace configurations', async () => {
					await makeAngularToolboxDirectory();
					await setPrefixInWorkspaceConfig('prefix');
					await createConfig({
						skipPrefix: true,
					});
					createPromptStub(sandbox)
						.inputBox('formatNumber') // "Enter pipe name (camel-case)"
						.apply();

					await runCommand();

					assertStrictEqual(
						path.join(getSrcDirectoryPath(), 'format-number.pipe.ts'),
						pipeWithoutPrefixFixture,
						'Generated directive content does not match fixture.',
					);
					await removeAngularCustomTemplatesDirectory();
					await deletePrefixFromConfig();
				});

				test('should prefix the pipe if the config skipPrefix is false and if the user has already provide a prefix in its workspace configurations', async () => {
					await makeAngularToolboxDirectory();
					await setPrefixInWorkspaceConfig('prefix');
					await createConfig({
						skipPrefix: false,
					});
					createPromptStub(sandbox)
						.inputBox('formatNumber') // "Enter pipe name (camel-case)"
						.apply();

					await runCommand();

					assertStrictEqual(
						path.join(getSrcDirectoryPath(), 'format-number.pipe.ts'),
						pipeWithPrefixFixture,
						'Generated directive content does not match fixture.',
					);
					await removeAngularCustomTemplatesDirectory();
					await deletePrefixFromConfig();
				});
			});
		},
	);
});

const runCommand = async () => {
	await executeCommand(
		'angular-toolbox.common-capabilities.generate-pipe',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};
