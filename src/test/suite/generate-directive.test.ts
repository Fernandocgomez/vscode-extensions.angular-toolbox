import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as sinon from 'sinon';
import {
	assertItDoesNotExists,
	assertItExists,
	assertStrictEqual,
	createPromptStub,
	executeCommand,
	getSrcDirectoryPath,
	makeSrcDirectory,
	removeSrcDirectory,
} from '../util';
import {
	directiveSpecFixture,
	directiveWithoutPrefix,
	directiveWithPrefixFixture,
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
		'when running the "gdlc-angular-toolbox.common-capabilities.generate-directive" command',
		() => {
			test('should generate a directive file and spec file if the user select "Yes" to the question "Do you want to generate the spec file?"', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Do you want to prefix your directive selector?"
					.inputBox('prefix') // 2. "Enter directive prefix (camel-case)"
					.inputBox('highlightContentOnHover') // 3. "Enter directive name (camel-case)"
					.quickPick('Yes') // 4. "Do you want to generate the spec file?"
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
				assertItExists(directivePath, `directive file should exist at ${directivePath}`);
				assertItExists(specPath, `Spec file should exist at ${specPath}`);
			});

			test('should generate a directive only when the user select, "No" to the question "Do you want to generate the spec file?"', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Do you want to prefix your directive selector?"
					.inputBox('prefix') // 2. "Enter directive prefix (camel-case)"
					.inputBox('highlightContentOnHover') // 3. "Enter directive name (camel-case)"
					.quickPick('No') // 4. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				const specPath = path.join(
					getSrcDirectoryPath(),
					'highlight-content-on-hover.directive.spec.ts',
				);
				assertItDoesNotExists(specPath, `Spec file should exist at ${specPath}`);
			});

			test('should generate a directive using the default directive template when the user does not provide a custom one', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Do you want to prefix your directive selector?"
					.inputBox('prefix') // 2. "Enter directive prefix (camel-case)"
					.inputBox('highlightContentOnHover') // 3. "Enter directive name (camel-case)"
					.quickPick('No') // 4. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'highlight-content-on-hover.directive.ts'),
					directiveWithPrefixFixture,
					'Generated directive content does not match fixture.',
				);
			});

			// test('should generate a directive using the custom directive template when the user provides one', async () => {});

			test('should generate a directive spec using the default directive spec template when the user does not provide a custom one', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Do you want to prefix your directive selector?"
					.inputBox('prefix') // 2. "Enter directive prefix (camel-case)"
					.inputBox('highlightContentOnHover') // 3. "Enter directive name (camel-case)"
					.quickPick('Yes') // 4. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'highlight-content-on-hover.directive.spec.ts'),
					directiveSpecFixture,
					'Generated spec content does not match fixture.',
				);
			});

			// test('should generate a directive spec using the custom directive spec template when the user provides one', async () => {});

			test('should generate a directive without prefix if the user select "No" to the question "Do you want to prefix your directive selector?', async () => {
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Do you want to prefix your directive selector?"
					.inputBox('highlightContentOnHover') // 2. "Enter directive name (camel-case)"
					.quickPick('No') // 3. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'highlight-content-on-hover.directive.ts'),
					directiveWithoutPrefix,
					'Generated directive content does not match fixture.',
				);
			});

			test('should show an error message if the is already a directive with the same name on the directory', async () => {
				fs.writeFileSync(
					path.join(getSrcDirectoryPath(), 'highlight-content-on-hover.directive.ts'),
					'dummy content',
				);
				const showErrorMessageStub = sandbox.stub(vscode.window, 'showErrorMessage');
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Do you want to prefix your directive selector?"
					.inputBox('highlightContentOnHover') // 2. "Enter directive name (camel-case)"
					.quickPick('No') // 3. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				assert.ok(
					showErrorMessageStub.calledOnce,
					'Should call the showErrorMessage function once',
				);
			});
		},
	);
});

const runCommand = async () => {
	await executeCommand(
		'gdlc-angular-toolbox.common-capabilities.generate-directive',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};
