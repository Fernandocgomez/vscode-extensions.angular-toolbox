import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import {
	removeSrcDirectory,
	createPromptStub,
	executeCommand,
	getSrcDirectoryPath,
	makeSrcDirectory,
	makeAngularToolboxDirectory,
	createTemplateFile,
	removeAngularCustomTemplatesDirectory,
	assertItExists,
	assertStrictEqual,
	assertItDoesNotExists,
	createConfig,
	setPrefixInWorkspaceConfig,
	deletePrefixFromConfig,
	getAngularToolboxDirectoryPath,
} from '../util';
import * as fs from 'fs';
import * as path from 'path';
import {
	componentSpecFixture,
	componentStorybookFixture,
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
		'when running the "angular-toolbox.common-capabilities.generate-component" command',
		() => {
			test('should generate a component and spec file', async () => {
				createPromptStub(sandbox)
					.inputBox('dummy') // "Enter component name"
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
					specPath,
					componentSpecFixture,
					'Generated component spec content does not match fixture.',
				);
			});

			test('should support camel case component names', async () => {
				createPromptStub(sandbox)
					.inputBox('dummyInCamelCase') // "Enter component name"
					.apply();

				await runCommand();

				const componentPath = path.join(
					getSrcDirectoryPath(),
					'dummy-in-camel-case.component.ts',
				);
				const specPath = path.join(
					getSrcDirectoryPath(),
					'dummy-in-camel-case.component.spec.ts',
				);

				assertItExists(
					componentPath,
					`Component file should exist at ${componentPath}`,
				);
				assertItExists(specPath, `Spec file should exist at ${specPath}`);
			});

			test('should support pascal case component names', async () => {
				createPromptStub(sandbox)
					.inputBox('DummyInCamelCase') // "Enter component name"
					.apply();

				await runCommand();

				const componentPath = path.join(
					getSrcDirectoryPath(),
					'dummy-in-camel-case.component.ts',
				);
				const specPath = path.join(
					getSrcDirectoryPath(),
					'dummy-in-camel-case.component.spec.ts',
				);

				assertItExists(
					componentPath,
					`Component file should exist at ${componentPath}`,
				);
				assertItExists(specPath, `Spec file should exist at ${specPath}`);
			});

			test('should generate a component file, but using a custom template when the user provide it', async () => {
				await makeAngularToolboxDirectory();
				await createTemplateFile(
					'component',
					customComponentTemplateTestingData,
				);
				createPromptStub(sandbox)
					.inputBox('dummy') // "Enter component name"
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
					.inputBox('dummy') // "Enter component name"
					.apply();

				await runCommand();

				assert.ok(
					showErrorMessageStub.calledOnce,
					'Should call the showErrorMessage function once',
				);
			});

			suite('and the user provider a custom config', () => {
				setup(async () => {
					await makeAngularToolboxDirectory();
				});

				teardown(async () => {
					await removeAngularCustomTemplatesDirectory();
				});

				test('should not generate the spec file if the config skipSpec is true', async () => {
					await createConfig({
						skipSpec: true,
					});
					createPromptStub(sandbox)
						.inputBox('dummy') // "Enter component name"
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
						.inputBox('dummy') // "Enter component name"
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
						.inputBox('dummy') // "Enter component name"
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
						.inputBox('dummy') // "Enter component name"
						.apply();

					await runCommand();

					assertStrictEqual(
						path.join(getSrcDirectoryPath(), 'dummy.component.ts'),
						componentWithDefaultChangeDetectionFixture,
						'Generated component content does not match fixture.',
					);
				});

				test('should not prefix the component if the skipPrefix is true even if the user already provide a prefix in its workspace configurations', async () => {
					await createConfig({
						skipPrefix: true,
					});
					await setPrefixInWorkspaceConfig('prefix');
					createPromptStub(sandbox)
						.inputBox('dummy') // "Enter component name"
						.apply();
					const componentPath = path.join(
						getSrcDirectoryPath(),
						'dummy.component.ts',
					);

					await runCommand();

					assertStrictEqual(
						componentPath,
						componentWithoutPrefixFixture,
						'Generated component content does not match fixture.',
					);
					await deletePrefixFromConfig();
				});

				test('should prefix the component if the skipPrefix property is false and the user already provide a prefix in its workspace configurations', async () => {
					await setPrefixInWorkspaceConfig('prefix');
					await createConfig({
						skipPrefix: false,
					});
					createPromptStub(sandbox)
						.inputBox('dummy') // "Enter component name"
						.apply();

					await runCommand();

					assertStrictEqual(
						path.join(getSrcDirectoryPath(), 'dummy.component.ts'),
						componentWithPrefixFixture,
						'Generated component content does not match fixture.',
					);
					await deletePrefixFromConfig();
				});

				test('should display a error message if the config is an empty file', async () => {
					await createEmptyConfigFile();

					const showErrorMessageStub = sandbox.stub(
						vscode.window,
						'showErrorMessage',
					);
					createPromptStub(sandbox)
						.inputBox('dummy') // "Enter component name"
						.apply();

					await runCommand();

					assert.ok(
						showErrorMessageStub.calledWith(
							'config.json is empty. ./.angular-toolbox/config.json',
						),
						'Should call the showErrorMessage function once',
					);
				});

				test('should generate a corresponding Storybook stories file subsequent to component generation when the component.generateStory configuration property is set to true', async () => {
					await createConfig({
						component: {
							generateStory: true,
						},
					});
					createPromptStub(sandbox)
						.inputBox('dummy') // "Enter component name"
						.apply();

					await runCommand();

					const storiesPath = path.join(
						getSrcDirectoryPath(),
						'dummy.component.stories.ts',
					);
					assertItExists(
						storiesPath,
						`Component stories file should exist at ${storiesPath}`,
					);
					assertStrictEqual(
						storiesPath,
						componentStorybookFixture,
						'Generated component stories content does not match fixture.',
					);
				});

				test('should not generate an storybook file if the config property component.generateStory is false', async () => {
					await createConfig({
						component: {
							generateStory: false,
						},
					});
					createPromptStub(sandbox)
						.inputBox('dummy') // "Enter component name"
						.apply();

					await runCommand();

					const storiesPath = path.join(
						getSrcDirectoryPath(),
						'dummy.component.stories.ts',
					);
					assertItDoesNotExists(
						storiesPath,
						`Component stories file should exist at ${storiesPath}`,
					);
				});
			});
		},
	);
});

const runCommand = async () => {
	await executeCommand(
		'angular-toolbox.common-capabilities.generate-component',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};

const createEmptyConfigFile = () => {
	const configPath = path.join(getAngularToolboxDirectoryPath(), 'config.json');

	try {
		fs.writeFileSync(configPath, '');
	} catch (error) {
		console.warn(
			`Could not create file ${configPath} (might already exist or other issue): ${error instanceof Error ? error.message : String(error)}`,
		);
	}
};
