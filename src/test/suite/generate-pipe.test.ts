import * as sinon from 'sinon';
import * as vscode from 'vscode';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import {
	createPromptStub,
	createTemplateFile,
	executeCommand,
	getSrcDirectoryPath,
	makeAngularCustomTemplatesDirectory,
	makeSrcDirectory,
	removeAngularCustomTemplatesDirectory,
	removeSrcDirectory,
} from '../util';
import {
	customTemplatePipeFixture,
	pipeSpecFixture,
	pipeSpecWithoutPrefixFixture,
	pipeWithoutPrefixFixture,
	pipeWithPrefixFixture,
} from './fixtures';
import { customPipeTemplateTestingData } from './custom-templates-testing-data';

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

	suite('when running the "gdlc-angular-toolbox.common-capabilities.generate-pipe" command', () => {
		test('should generate a pipe file and spec file if the user select "Yes" to the question "Do you want to generate the spec file?"', async () => {
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

		test('should generate a pipe file without prefix and spec file if the user select "No" to the question "Do you want to prefix your pipe selector?"', async () => {
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

		test('should generate a pipe file only if the user select "No" to the question "Do you want to generate the spec file?"', async () => {
			createPromptStub(sandbox)
				.quickPick('Yes') // 1. "Do you want to prefix your pipe selector?"
				.inputBox('prefix') // 2. "Enter pipe prefix (camel-case)"
				.inputBox('formatCurrency') // 3. "Enter pipe name (camel-case)"
				.quickPick('No') // 4. "Do you want to generate the spec file?"
				.apply();

			await executeCommand(
				'gdlc-angular-toolbox.common-capabilities.generate-pipe',
				vscode.Uri.file(getSrcDirectoryPath()),
			);

			const pipePath = path.join(getSrcDirectoryPath(), 'format-currency.pipe.ts');
			const specPath = path.join(getSrcDirectoryPath(), 'format-currency.pipe.spec.ts');

			assert.ok(fs.existsSync(pipePath), `Pipe file should exist at ${pipePath}`);
			assert.strictEqual(
				fs.existsSync(specPath),
				false,
				`Spec file should NOT exist at ${specPath}`,
			);
		});

		test('should generate a pipe file using the custom template if the user has a pipe template on the .angular-custom-templates folder', async () => {
			await makeAngularCustomTemplatesDirectory();
			await createTemplateFile('pipe', customPipeTemplateTestingData);
			createPromptStub(sandbox)
				.quickPick('No') // 1. "Do you want to prefix your pipe selector?"
				.inputBox('dummy') // 2. "Enter pipe name (camel-case)"
				.quickPick('No') // 3. "Do you want to generate the spec file?"
				.apply();

			await executeCommand(
				'gdlc-angular-toolbox.common-capabilities.generate-pipe',
				vscode.Uri.file(getSrcDirectoryPath()),
			);

			assert.strictEqual(
				fs
					.readFileSync(path.join(getSrcDirectoryPath(), 'dummy.pipe.ts'), 'utf-8')
					.replace(/\r\n/g, '\n'),
				customTemplatePipeFixture.replace(/\r\n/g, '\n'),
				'Generated pipe content does not match fixture.',
			);

			await removeAngularCustomTemplatesDirectory();
		});

		test('should show an error message if there is already an existent pipe with the same name on the directory', async () => {
			fs.writeFileSync(path.join(getSrcDirectoryPath(), 'dummy.pipe.ts'), 'dummy content');
			const showErrorMessageStub = sandbox.stub(vscode.window, 'showErrorMessage');
			createPromptStub(sandbox)
				.quickPick('No') // 1. "Do you want to prefix your pipe selector?"
				.inputBox('dummy') // 2. "Enter pipe name (camel-case)"
				.quickPick('No') // 3. "Do you want to generate the spec file?"
				.apply();

			await executeCommand(
				'gdlc-angular-toolbox.common-capabilities.generate-pipe',
				vscode.Uri.file(getSrcDirectoryPath()),
			);
			assert.ok(showErrorMessageStub.calledOnce, 'Should call the showErrorMessage function once');
		});
	});
});
