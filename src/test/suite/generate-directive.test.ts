import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as sinon from 'sinon';
import {
	assertItExists,
	createPromptStub,
	executeCommand,
	getSrcDirectoryPath,
	makeSrcDirectory,
	removeSrcDirectory,
} from '../util';

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
		},
	);
});

const runCommand = async () => {
	await executeCommand(
		'gdlc-angular-toolbox.common-capabilities.generate-directive',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};
