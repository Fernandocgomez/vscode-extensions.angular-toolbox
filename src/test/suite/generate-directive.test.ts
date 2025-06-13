import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as sinon from 'sinon';
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
	directiveSpecFixture,
	directiveWithCustomTemplateFixture,
	directiveWithCustomTemplateSpecFixture,
	directiveWithoutPrefix,
	directiveWithPrefixFixture,
	customDirectiveSpecTemplateTestingData,
	customDirectiveTemplateTestingData,
} from './fixtures';

suite('Generate Directive Test Suite', () => {
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
		'when running the "angular-toolbox.common-capabilities.generate-directive" command',
		() => {
			test('should generate a directive file and spec file', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Do you want to prefix your directive selector?"
					.inputBox('prefix') // 2. "Enter directive prefix (camel-case)"
					.inputBox('highlightContentOnHover') // 3. "Enter directive name (camel-case)"
					.apply();

				await runCommand();

				const directivePath = path.join(
					getSrcDirectoryPath(),
					'highlight-content-on-hover.directive.ts',
				);
				const specPath = path.join(
					getSrcDirectoryPath(),
					'highlight-content-on-hover.directive.spec.ts',
				);
				assertItExists(
					directivePath,
					`directive file should exist at ${directivePath}`,
				);
				assertItExists(specPath, `Spec file should exist at ${specPath}`);
			});

			test('should generate a directive using the default directive template when the user does not provide a custom one', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Do you want to prefix your directive selector?"
					.inputBox('prefix') // 2. "Enter directive prefix (camel-case)"
					.inputBox('highlightContentOnHover') // 3. "Enter directive name (camel-case)"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(
						getSrcDirectoryPath(),
						'highlight-content-on-hover.directive.ts',
					),
					directiveWithPrefixFixture,
					'Generated directive content does not match fixture.',
				);
			});

			test('should generate a directive using the custom directive template when the user provides one', async () => {
				await makeAngularCustomTemplatesDirectory();
				await createTemplateFile(
					'directive',
					customDirectiveTemplateTestingData,
				);
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Do you want to prefix your directive selector?"
					.inputBox('highlightContentOnHover') // 2. "Enter directive name (camel-case)"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(
						getSrcDirectoryPath(),
						'highlight-content-on-hover.directive.ts',
					),
					directiveWithCustomTemplateFixture,
					'Generated directive content does not match fixture.',
				);

				await removeAngularCustomTemplatesDirectory();
			});

			test('should generate a directive spec using the default directive spec template when the user does not provide a custom one', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Do you want to prefix your directive selector?"
					.inputBox('prefix') // 2. "Enter directive prefix (camel-case)"
					.inputBox('highlightContentOnHover') // 3. "Enter directive name (camel-case)"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(
						getSrcDirectoryPath(),
						'highlight-content-on-hover.directive.spec.ts',
					),
					directiveSpecFixture,
					'Generated spec content does not match fixture.',
				);
			});

			test('should generate a directive spec using the custom directive spec template when the user provides one', async () => {
				await makeAngularCustomTemplatesDirectory();
				await createTemplateFile(
					'directive.spec',
					customDirectiveSpecTemplateTestingData,
				);
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Do you want to prefix your directive selector?"
					.inputBox('highlightContentOnHover') // 2. "Enter directive name (camel-case)"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(
						getSrcDirectoryPath(),
						'highlight-content-on-hover.directive.spec.ts',
					),
					directiveWithCustomTemplateSpecFixture,
					'Generated directive content does not match fixture.',
				);

				await removeAngularCustomTemplatesDirectory();
			});

			test('should generate a directive without prefix if the user select "No" to the question "Do you want to prefix your directive selector?', async () => {
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Do you want to prefix your directive selector?"
					.inputBox('highlightContentOnHover') // 2. "Enter directive name (camel-case)"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(
						getSrcDirectoryPath(),
						'highlight-content-on-hover.directive.ts',
					),
					directiveWithoutPrefix,
					'Generated directive content does not match fixture.',
				);
			});

			test('should show an error message if there is already a directive with the same file name on the directory', async () => {
				fs.writeFileSync(
					path.join(
						getSrcDirectoryPath(),
						'highlight-content-on-hover.directive.ts',
					),
					'dummy content',
				);
				const showErrorMessageStub = sandbox.stub(
					vscode.window,
					'showErrorMessage',
				);
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Do you want to prefix your directive selector?"
					.inputBox('highlightContentOnHover') // 2. "Enter directive name (camel-case)"
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
						skipSpec: true,
					});
					createPromptStub(sandbox)
						.quickPick('No') // 1. "Do you want to prefix your directive selector?"
						.inputBox('highlightContentOnHover') // 2. "Enter directive name (camel-case)"
						.apply();

					await runCommand();

					const specPath = path.join(
						getSrcDirectoryPath(),
						'.highlight-content-on-hover.directive.spec.ts',
					);
					assertItDoesNotExists(
						specPath,
						`Directive spec file should not exist at ${specPath}`,
					);
					await removeAngularCustomTemplatesDirectory();
				});

				test('should not ask the user to collect the prefix if the config skipPrefix is true', async () => {
					await makeAngularCustomTemplatesDirectory();
					await createConfig({
						skipPrefix: true,
					});
					const showInputBoxStub = sandbox.stub(vscode.window, 'showInputBox');
					showInputBoxStub.resolves('highlightContentOnHover');

					await runCommand();

					assert.ok(
						showInputBoxStub.calledOnce,
						'Should call the showInputBox function once',
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
						showInputBoxStub.resolves('highlightContentOnHover');

						await runCommand();

						assert.ok(
							showInputBoxStub.calledOnce,
							'Should call the showInputBox function once',
						);
						assertStrictEqual(
							path.join(
								getSrcDirectoryPath(),
								'highlight-content-on-hover.directive.ts',
							),
							directiveWithPrefixFixture,
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
		'angular-toolbox.common-capabilities.generate-directive',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};
