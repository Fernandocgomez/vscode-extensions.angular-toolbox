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
	makeAngularToolboxDirectory,
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
					.inputBox('highlightContentOnHover') // "Enter directive name (camel-case)"
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

			test('should support kebab case directive names', async () => {
				createPromptStub(sandbox)
					.inputBox('highlight-content-on-hover') // "Enter directive name"
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

			test('should support pascal case directive names', async () => {
				createPromptStub(sandbox)
					.inputBox('HighlightContentOnHover') // "Enter directive name (camel-case)"
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
					.inputBox('highlightContentOnHover') // "Enter directive name (camel-case)"
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

			test('should generate a directive using the custom directive template when the user provides one', async () => {
				await makeAngularToolboxDirectory();
				await createTemplateFile(
					'directive',
					customDirectiveTemplateTestingData,
				);
				createPromptStub(sandbox)
					.inputBox('highlightContentOnHover') // "Enter directive name (camel-case)"
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
					.inputBox('highlightContentOnHover') // "Enter directive name (camel-case)"
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
				await makeAngularToolboxDirectory();
				await createTemplateFile(
					'directive.spec',
					customDirectiveSpecTemplateTestingData,
				);
				createPromptStub(sandbox)
					.inputBox('highlightContentOnHover') // "Enter directive name (camel-case)"
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
					.inputBox('highlightContentOnHover') // "Enter directive name (camel-case)"
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
						.inputBox('highlightContentOnHover') // "Enter directive name (camel-case)"
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

				test('should not prefix the directive if the config skipPrefix is true even if the user already provide a prefix in its workspace configurations', async () => {
					await setPrefixInWorkspaceConfig('prefix');
					await makeAngularToolboxDirectory();
					await createConfig({
						skipPrefix: true,
					});
					createPromptStub(sandbox)
						.inputBox('highlightContentOnHover') // "Enter directive name (camel-case)"
						.apply();

					await runCommand();

					await removeAngularCustomTemplatesDirectory();
					await deletePrefixFromConfig();
				});

				test('should prefix the directive if the config skipPrefix is false and if the user already provide a prefix in its workspace configurations', async () => {
					await setPrefixInWorkspaceConfig('prefix');
					await createConfig({
						skipPrefix: false,
					});
					createPromptStub(sandbox)
						.inputBox('highlightContentOnHover') // "Enter directive name (camel-case)"
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
					await deletePrefixFromConfig();
				});
			});
		},
	);
});

const runCommand = async () => {
	await executeCommand(
		'angular-toolbox.common-capabilities.generate-directive',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};
