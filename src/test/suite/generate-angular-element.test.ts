import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import * as fs from 'fs';
import * as path from 'path';
import {
	createConfig,
	createPromptStub,
	executeCommand,
	getSrcDirectoryPath,
	makeAngularToolboxDirectory,
	makeSrcDirectory,
	removeAngularCustomTemplatesDirectory,
	removeSrcDirectory,
} from '../util';

/**
 * Validates shared logic and consistent behavior for Angular element generation schematics.
 */

suite('Generate Angular Element', () => {
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
			suite(
				'and user provide a custom config with the property addToIndex set to "true"',
				() => {
					test('should generate an `index.ts` barrel file that re-exports the newly created Angular element', async () => {
						await makeAngularToolboxDirectory();
						await createConfig({
							addToIndex: true,
						});
						createPromptStub(sandbox)
							.quickPick('No') // 1. "Do you want to prefix your component selector?"
							.inputBox('dummy') // 2. "Enter component name (kebab-case)"
							.apply();

						await runCommand();

						const indexFilePath = path.join(getSrcDirectoryPath(), 'index.ts');
						assert.ok(
							fs.existsSync(indexFilePath),
							`Index file should exist at ${indexFilePath}`,
						);
						assert.ok(
							fs
								.readFileSync(indexFilePath, 'utf-8')
								.includes("export * from './dummy.component';"),
							'Index file should include the newly created component',
						);
						await removeAngularCustomTemplatesDirectory();
					});
				},
			);

			suite(
				'and user provide a custom config with the property addToIndex set to "false"',
				() => {
					test('should generate an `index.ts` barrel file that re-exports the newly created Angular element', async () => {
						await makeAngularToolboxDirectory();
						await createConfig({
							addToIndex: false,
						});
						createPromptStub(sandbox)
							.quickPick('No') // 1. "Do you want to prefix your component selector?"
							.inputBox('dummy') // 2. "Enter component name (kebab-case)"
							.apply();

						await runCommand();

						const indexFilePath = path.join(getSrcDirectoryPath(), 'index.ts');
						assert.ok(
							!fs.existsSync(indexFilePath),
							`Index file should not exist at ${indexFilePath}`,
						);
						await removeAngularCustomTemplatesDirectory();
					});
				},
			);
		},
	);
});

const runCommand = async () => {
	await executeCommand(
		'angular-toolbox.common-capabilities.generate-component',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};
