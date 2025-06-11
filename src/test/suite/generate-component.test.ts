import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import {
	removeSrcDirectory,
	createPromptStub,
	executeCommand,
	getSrcDirectoryPath,
	makeSrcDirectory,
	makeAngularCustomTemplatesDirectory,
	createTemplateFile,
	removeAngularCustomTemplatesDirectory,
	assertItExists,
	assertStrictEqual,
	assertItDoesNotExists,
	createConfig,
	setPrefixInWorkspaceConfig,
	deletePrefixFromConfig,
} from '../util';
import * as fs from 'fs';
import * as path from 'path';
import {
	componentSpecFixture,
	componentWithDefaultChangeDetectionFixture,
	componentWithoutPrefixFixture,
	componentWithoutPrefixGeneratedUsingCustomTemplateFixture,
	componentWithPrefixFixture,
	componentWithSeparateCssFixture,
	componentWithSeparateHtmlFixture,
	customComponentTemplateTestingData,
} from './fixtures';

suite('Generate Component', () => {
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
		'when running the "gdlc-angular-toolbox.common-capabilities.generate-component" command',
		() => {
			test('should generate a component and spec file', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Do you want to prefix your component selector?"
					.inputBox('prefix') // 2. "Enter component prefix (kebab-case)"
					.inputBox('dummy') // 3. "Enter component name (kebab-case)"
					.apply();

				await runCommand();

				const componentPath = path.join(
					getSrcDirectoryPath(),
					'dummy.component.ts',
				);
				const specPath = path.join(
					getSrcDirectoryPath(),
					'dummy.component.spec.ts',
				);

				assertItExists(
					componentPath,
					`Component file should exist at ${componentPath}`,
				);
				assertItExists(specPath, `Spec file should exist at ${specPath}`);
				assertStrictEqual(
					componentPath,
					componentWithPrefixFixture,
					'Generated component content does not match fixture.',
				);
				assertStrictEqual(
					specPath,
					componentSpecFixture,
					'Generated spec content does not match fixture.',
				);
			});

			test('should generate a component file without prefix if the user select "No" on the "Do you want to prefix your component selector?" question', async () => {
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Do you want to prefix your component selector?"
					.inputBox('dummy') // 2. "Enter component name (kebab-case)"
					.apply();

				await runCommand();

				const componentPath = path.join(
					getSrcDirectoryPath(),
					'dummy.component.ts',
				);
				assertItExists(
					componentPath,
					`Component file should exist at ${componentPath}`,
				);
				assertStrictEqual(
					componentPath,
					componentWithoutPrefixFixture,
					'Generated component content does not match fixture.',
				);
			});

			test('should generate a component file, but using a custom template when the user provide it', async () => {
				await makeAngularCustomTemplatesDirectory();
				await createTemplateFile(
					'component',
					customComponentTemplateTestingData,
				);
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Do you want to prefix your component selector?"
					.inputBox('dummy') // 2. "Enter component name (kebab-case)"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'dummy.component.ts'),
					componentWithoutPrefixGeneratedUsingCustomTemplateFixture,
					'Generated component content does not match fixture.',
				);
				await removeAngularCustomTemplatesDirectory();
			});

			test('should show an error message if there is already an existent component with the same name on the directory', async () => {
				fs.writeFileSync(
					path.join(getSrcDirectoryPath(), 'dummy.component.ts'),
					'dummy content',
				);
				const showErrorMessageStub = sandbox.stub(
					vscode.window,
					'showErrorMessage',
				);
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Do you want to prefix your component selector?"
					.inputBox('dummy') // 2. "Enter component name (kebab-case)"
					.apply();

				await runCommand();

				assert.ok(
					showErrorMessageStub.calledOnce,
					'Should call the showErrorMessage function once',
				);
			});

			suite('and the user provider a custom config', () => {
				setup(async () => {
					await makeAngularCustomTemplatesDirectory();
				});

				teardown(async () => {
					await removeAngularCustomTemplatesDirectory();
				});

				test('should not generate the spec file if the config skipSpec is true', async () => {
					await createConfig({
						skipSpec: true,
					});
					createPromptStub(sandbox)
						.quickPick('No') // 1. "Do you want to prefix your component selector?"
						.inputBox('dummy') // 2. "Enter component name (kebab-case)"
						.apply();

					await runCommand();

					const specPath = path.join(
						getSrcDirectoryPath(),
						'dummy.component.spec.ts',
					);
					assertItDoesNotExists(
						specPath,
						`Component spec file should not exist at ${specPath}`,
					);
				});

				test('should generate a component with a separate html file if the config inlineTemplate is false', async () => {
					await createConfig({
						component: {
							inlineTemplate: false,
						},
					});
					createPromptStub(sandbox)
						.quickPick('No') // 1. "Do you want to prefix your component selector?"
						.inputBox('dummy') // 2. "Enter component name (kebab-case)"
						.apply();

					await runCommand();

					assertStrictEqual(
						path.join(getSrcDirectoryPath(), 'dummy.component.ts'),
						componentWithSeparateHtmlFixture,
						'Generated component content does not match fixture.',
					);
					const componentHtmlPath = path.join(
						getSrcDirectoryPath(),
						'dummy.component.html',
					);
					assertItExists(
						componentHtmlPath,
						`Component html file should exist at ${componentHtmlPath}`,
					);
				});

				test('should generate a component with a separate css file if the config inlineTemplate is inlineStyle ', async () => {
					await createConfig({
						component: {
							inlineStyle: false,
							stylesheetsFormat: 'scss',
						},
					});
					createPromptStub(sandbox)
						.quickPick('No') // 1. "Do you want to prefix your component selector?"
						.inputBox('dummy') // 2. "Enter component name (kebab-case)"
						.apply();

					await runCommand();

					assertStrictEqual(
						path.join(getSrcDirectoryPath(), 'dummy.component.ts'),
						componentWithSeparateCssFixture,
						'Generated component content does not match fixture.',
					);
					const componentCssPath = path.join(
						getSrcDirectoryPath(),
						'dummy.component.scss',
					);
					assertItExists(
						componentCssPath,
						`Component html file should exist at ${componentCssPath}`,
					);
				});

				test('should generate a component with the change detection set to Default if the config withOnPushChangeDetection is false', async () => {
					await createConfig({
						component: {
							withOnPushChangeDetection: false,
						},
					});
					createPromptStub(sandbox)
						.quickPick('No') // 1. "Do you want to prefix your component selector?"
						.inputBox('dummy') // 2. "Enter component name (kebab-case)"
						.apply();

					await runCommand();

					assertStrictEqual(
						path.join(getSrcDirectoryPath(), 'dummy.component.ts'),
						componentWithDefaultChangeDetectionFixture,
						'Generated component content does not match fixture.',
					);
				});

				test('should not ask the user to collect the prefix if the config skipPrefix is true', async () => {
					await createConfig({
						skipPrefix: true,
					});
					const showInputBoxStub = sandbox.stub(vscode.window, 'showInputBox');
					showInputBoxStub.resolves('dummy');

					await runCommand();

					assert.ok(
						showInputBoxStub.calledOnce,
						'Should call the showInputBox function once',
					);
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
						showInputBoxStub.resolves('dummy');

						await runCommand();

						assert.ok(
							showInputBoxStub.calledOnce,
							'Should call the showInputBox function once',
						);
						assertStrictEqual(
							path.join(getSrcDirectoryPath(), 'dummy.component.ts'),
							componentWithPrefixFixture,
							'Generated component content does not match fixture.',
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
		'gdlc-angular-toolbox.common-capabilities.generate-component',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};
