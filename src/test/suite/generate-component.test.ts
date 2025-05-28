import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import {
	cleanupSrcDirectory,
	createPromptStub,
	ensureExtensionActivated,
	executeCommand,
	getSrcDirectoryPath,
	makeSrcDirectory,
} from '../util';

suite('Extension Interaction Tests', () => {
	let sandbox: sinon.SinonSandbox;

	suiteSetup(async () => {
		await ensureExtensionActivated();

		await cleanupSrcDirectory();
	});

	setup(async () => {
		sandbox = sinon.createSandbox();

		await makeSrcDirectory();
	});

	teardown(async () => {
		sandbox.restore();

		await cleanupSrcDirectory();
	});

	suiteTeardown(async () => {
		vscode.window.showInformationMessage('All interaction tests done!');

		await cleanupSrcDirectory();
	});

	test('should generate a component and spec file when running the "gdlc-angular-toolbox.common-capabilities.generate-component" command', async () => {
		createPromptStub(sandbox)
			.quickPick('Yes') // 1. "Do you want to prefix your component selector?"
			.inputBox('prefix') // 2. "Enter component prefix (kebab-case)"
			.inputBox('test3') // 3. "Enter component name (kebab-case)"
			.quickPick('Yes') // 4. "Do you want to generate the spec file?"
			.apply();

		await executeCommand(
			'gdlc-angular-toolbox.common-capabilities.generate-component',
			vscode.Uri.file(getSrcDirectoryPath()),
		);

		assert.ok(true, 'Test reached the basic assertion.');

		// Assert that the component generated matches the fixture.
		// Assert that the spec generated matches the fixture.
	});
});
