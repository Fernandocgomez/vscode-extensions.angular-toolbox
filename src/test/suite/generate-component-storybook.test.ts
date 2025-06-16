import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import * as fs from 'fs';
import * as path from 'path';
import {
	assertItExists,
	assertStrictEqual,
	executeCommand,
	getSrcDirectoryPath,
	makeSrcDirectory,
	removeSrcDirectory,
} from '../util';
import {
	componentStorybookFixture,
	componentWithoutPrefixFixture,
} from './fixtures';

suite('Generate Component Storybook', () => {
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
		'when running the "angular-toolbox.common-capabilities.generate-component-storybook" command',
		() => {
			test('should generate a component storybook file', async () => {
				const componentPath = path.join(
					getSrcDirectoryPath(),
					'dummy.component.ts',
				);
				fs.writeFileSync(componentPath, componentWithoutPrefixFixture);

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

			test('should auto open the storybook file after being generated', async () => {
				const showTextDocumentStub = sandbox.stub(
					vscode.window,
					'showTextDocument',
				);
				const componentPath = path.join(
					getSrcDirectoryPath(),
					'dummy.component.ts',
				);
				fs.writeFileSync(componentPath, componentWithoutPrefixFixture);

				await runCommand();

				assert.ok(
					showTextDocumentStub.calledOnce,
					'Should call the showTextDocument function once',
				);
			});

			test('should not generate storybook file if the file already exist and it should display an error message "File already exist"', async () => {
				const componentPath = path.join(
					getSrcDirectoryPath(),
					'dummy.component.ts',
				);
				const storiesPath = path.join(
					getSrcDirectoryPath(),
					'dummy.component.stories.ts',
				);
				const showErrorMessageStub = sandbox.stub(
					vscode.window,
					'showErrorMessage',
				);
				fs.writeFileSync(componentPath, componentWithoutPrefixFixture);
				fs.writeFileSync(storiesPath, componentStorybookFixture);

				await runCommand();

				assert.ok(
					showErrorMessageStub.calledWith('File already exist'),
					'Should call the showErrorMessage function once with the argument "File already exist"',
				);
			});
		},
	);
});

const runCommand = async () => {
	await executeCommand(
		'angular-toolbox.common-capabilities.generate-component-storybook',
		vscode.Uri.file(path.join(getSrcDirectoryPath(), 'dummy.component.ts')),
	);
};
