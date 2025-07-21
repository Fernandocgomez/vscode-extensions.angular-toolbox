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

const enumFixture = `export enum UrlBuilder {}`;

suite('Generate Enum', () => {
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
		'when running the "angular-toolbox.common-capabilities.generate-enum" command',
		() => {
			test('should generate an enum file', async () => {
				createPromptStub(sandbox)
					.inputBox('url-builder') // "Enter enum name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.enum.ts'),
					`Enum file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.enum.ts')}`,
				);
				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'url-builder.enum.ts'),
					enumFixture,
					`Generated enum content does not match fixture.`,
				);
			});

			test('should accept the name as kebab-case', async () => {
				createPromptStub(sandbox)
					.inputBox('url-builder') // "Enter enum name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.enum.ts'),
					`Enum file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.enum.ts')}`,
				);
			});

			test('should accept the name as camel-case', async () => {
				createPromptStub(sandbox)
					.inputBox('urlBuilder') // "Enter enum name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.enum.ts'),
					`Enum file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.enum.ts')}`,
				);
			});

			test('should accept the name as pascal-case', async () => {
				createPromptStub(sandbox)
					.inputBox('UrlBuilder') // "Enter enum name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.enum.ts'),
					`Enum file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.enum.ts')}`,
				);
			});
		},
	);
});

const runCommand = async () => {
	await executeCommand(
		'angular-toolbox.common-capabilities.generate-enum',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};
