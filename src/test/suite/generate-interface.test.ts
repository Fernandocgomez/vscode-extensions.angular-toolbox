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

const interfaceFixture = `export interface UrlBuilder {}`;

suite('Generate Interface', () => {
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
		'when running the "angular-toolbox.common-capabilities.generate-interface" command',
		() => {
			test('should generate an interface file', async () => {
				createPromptStub(sandbox)
					.inputBox('url-builder') // "Enter interface name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.interface.ts'),
					`Interface file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.interface.ts')}`,
				);
				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'url-builder.interface.ts'),
					interfaceFixture,
					`Generated interface content does not match fixture.`,
				);
			});

			test('should accept the name as kebab-case', async () => {
				createPromptStub(sandbox)
					.inputBox('url-builder') // "Enter interface name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.interface.ts'),
					`Interface file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.interface.ts')}`,
				);
			});

			test('should accept the name as camel-case', async () => {
				createPromptStub(sandbox)
					.inputBox('urlBuilder') // "Enter interface name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.interface.ts'),
					`Interface file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.interface.ts')}`,
				);
			});

			test('should accept the name as pascal-case', async () => {
				createPromptStub(sandbox)
					.inputBox('UrlBuilder') // "Enter interface name"
					.apply();

				await runCommand();

				assertItExists(
					path.join(getSrcDirectoryPath(), 'url-builder.interface.ts'),
					`Interface file should exist at ${path.join(getSrcDirectoryPath(), 'url-builder.interface.ts')}`,
				);
			});
		},
	);
});

const runCommand = async () => {
	await executeCommand(
		'angular-toolbox.common-capabilities.generate-interface',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};
