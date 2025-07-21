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

const typeFixture = `export type UrlBuilder = '';`;

suite('Generate Type', () => {
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
		'when running the "angular-toolbox.common-capabilities.generate-type" command',
		() => {
			test('should generate a type file', async () => {
				createPromptStub(sandbox)
					.inputBox('url-builder') // "Enter type name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.type.ts'),
					`Type file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.type.ts')}`,
				);
				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'url-builder.type.ts'),
					typeFixture,
					`Generated type content does not match fixture.`,
				);
			});

			test('should accept the name as kebab-case', async () => {
				createPromptStub(sandbox)
					.inputBox('url-builder') // "Enter type name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.type.ts'),
					`Type file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.type.ts')}`,
				);
			});

			test('should accept the name as camel-case', async () => {
				createPromptStub(sandbox)
					.inputBox('urlBuilder') // "Enter type name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.type.ts'),
					`Type file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.type.ts')}`,
				);
			});

			test('should accept the name as pascal-case', async () => {
				createPromptStub(sandbox)
					.inputBox('UrlBuilder') // "Enter type name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.type.ts'),
					`Type file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.type.ts')}`,
				);
			});
		},
	);
});

const runCommand = async () => {
	await executeCommand(
		'angular-toolbox.common-capabilities.generate-type',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};
