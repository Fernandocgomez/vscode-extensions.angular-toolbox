import * as vscode from 'vscode';
import * as sinon from 'sinon';
import * as path from 'path';
import {
	assertItExists,
	assertStrictEqual,
	createPromptStub,
	executeCommand,
	getSrcDirectoryPath,
	makeSrcDirectory,
	removeSrcDirectory,
} from '../util';

const classFixture = `export class UrlBuilder {}`;

suite('Generate Class', () => {
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
		'when running the "angular-toolbox.common-capabilities.generate-class" command',
		() => {
			test('should generate a class file', async () => {
				createPromptStub(sandbox)
					.inputBox('url-builder') // "Enter class name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.class.ts'),
					`Class file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.class.ts')}`,
				);
				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'url-builder.class.ts'),
					classFixture,
					`Generated class content does not match fixture.`,
				);
			});

			test('should accept the name as kebab-case', async () => {
				createPromptStub(sandbox)
					.inputBox('url-builder') // "Enter class name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.class.ts'),
					`Class file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.class.ts')}`,
				);
			});

			test('should accept the name as camel-case', async () => {
				createPromptStub(sandbox)
					.inputBox('urlBuilder') // "Enter class name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.class.ts'),
					`Class file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.class.ts')}`,
				);
			});

			test('should accept the name as pascal-case', async () => {
				createPromptStub(sandbox)
					.inputBox('UrlBuilder') // "Enter class name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.class.ts'),
					`Class file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.class.ts')}`,
				);
			});
		},
	);
});

const runCommand = async () => {
	await executeCommand(
		'angular-toolbox.common-capabilities.generate-class',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};
