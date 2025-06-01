import * as sinon from 'sinon';
import * as vscode from 'vscode';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import {
	createPromptStub,
	executeCommand,
	getSrcDirectoryPath,
	makeSrcDirectory,
	removeSrcDirectory,
} from '../util';
import {
	pipeSpecFixture,
	pipeSpecWithoutPrefixFixture,
	pipeWithoutPrefixFixture,
	pipeWithPrefixFixture,
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

	test('should generate a pipe file and spec file when running the "gdlc-angular-toolbox.common-capabilities.generate-pipe" command', async () => {
		createPromptStub(sandbox)
			.quickPick('Yes') // 1. "Do you want to prefix your pipe selector?"
			.inputBox('prefix') // 2. "Enter pipe prefix (camel-case)"
			.inputBox('formatNumber') // 3. "Enter pipe name (camel-case)"
			.quickPick('Yes') // 4. "Do you want to generate the spec file?"
			.apply();

		await executeCommand(
			'gdlc-angular-toolbox.common-capabilities.generate-pipe',
			vscode.Uri.file(getSrcDirectoryPath()),
		);

		const pipePath = path.join(getSrcDirectoryPath(), 'format-number.pipe.ts');
		const specPath = path.join(getSrcDirectoryPath(), 'format-number.pipe.spec.ts');

		assert.ok(fs.existsSync(pipePath), `Pipe file should exist at ${pipePath}`);
		assert.ok(fs.existsSync(specPath), `Spec file should exist at ${specPath}`);
		assert.strictEqual(
			fs.readFileSync(pipePath, 'utf-8').replace(/\r\n/g, '\n'),
			pipeWithPrefixFixture.replace(/\r\n/g, '\n'),
			'Generated pipe content does not match fixture.',
		);
		assert.strictEqual(
			fs.readFileSync(specPath, 'utf-8').replace(/\r\n/g, '\n'),
			pipeSpecFixture.replace(/\r\n/g, '\n'),
			'Generated spec content does not match fixture.',
		);
	});

	test('should generate a pipe file without prefix and spec file when running the "gdlc-angular-toolbox.common-capabilities.generate-pipe" command', async () => {
		createPromptStub(sandbox)
			.quickPick('No') // 1. "Do you want to prefix your pipe selector?"
			.inputBox('formatDate') // 2. "Enter pipe name (camel-case)"
			.quickPick('Yes') // 3. "Do you want to generate the spec file?"
			.apply(); // 4. No prefix, no spec

		await executeCommand(
			'gdlc-angular-toolbox.common-capabilities.generate-pipe',
			vscode.Uri.file(getSrcDirectoryPath()),
		);

		const pipePath = path.join(getSrcDirectoryPath(), 'format-date.pipe.ts');
		const specPath = path.join(getSrcDirectoryPath(), 'format-date.pipe.spec.ts');

		assert.ok(fs.existsSync(pipePath), `Pipe file should exist at ${pipePath}`);
		assert.ok(fs.existsSync(specPath), `Spec file should exist at ${specPath}`);

		assert.strictEqual(
			fs.readFileSync(pipePath, 'utf-8').replace(/\r\n/g, '\n'),
			pipeWithoutPrefixFixture.replace(/\r\n/g, '\n'),
			'Generated pipe content does not match fixture.',
		);
		assert.strictEqual(
			fs.readFileSync(specPath, 'utf-8').replace(/\r\n/g, '\n'),
			pipeSpecWithoutPrefixFixture.replace(/\r\n/g, '\n'),
			'Generated spec content does not match fixture.',
		);
	});

	// test('should generate a pipe file only when running the "gdlc-angular-toolbox.common-capabilities.generate-pipe" command', () => {});

	// test('should generate a pipe using the custom template when the consumer provide a pipe template', () => {});

	// test('should throw an exception when the a pipe files with the same file name already exist on the directory', () => {});
});
