import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as sinon from 'sinon';
import {
	assertItExists,
	executeCommand,
	getSrcDirectoryPath,
	makeSrcDirectory,
	removeSrcDirectory,
} from '../util';
import {
	componentWithoutPrefixFixture,
	pipeWithPrefixFixture,
	directiveWithPrefixFixture,
	httpServiceFixture,
} from './fixtures';

suite('Generate Spec File', () => {
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
		'when running the command "angular-toolbox.common-capabilities.generate-spec"',
		() => {
			test('should generate a spec file for a component', async () => {
				const componentPath = path.join(
					getSrcDirectoryPath(),
					'dummy.component.ts',
				);
				fs.writeFileSync(componentPath, componentWithoutPrefixFixture);

				await runCommand(componentPath);

				const componentSpecPath = path.join(
					getSrcDirectoryPath(),
					'dummy.component.spec.ts',
				);
				assertItExists(
					componentSpecPath,
					`Spec file should have been created at ${componentSpecPath}`,
				);
			});

			test('should open the component spec file after the command is executed', async () => {
				const showTextDocumentStub = sandbox.stub(
					vscode.window,
					'showTextDocument',
				);
				const componentPath = path.join(
					getSrcDirectoryPath(),
					'dummy.component.ts',
				);
				fs.writeFileSync(componentPath, componentWithoutPrefixFixture);

				await runCommand(componentPath);

				assert.ok(
					showTextDocumentStub.calledOnce,
					'Should call the showTextDocument function once',
				);
			});

			test('should generate a spec file for a pipe', async () => {
				const pipePath = path.join(
					getSrcDirectoryPath(),
					'format-number.pipe.ts',
				);
				fs.writeFileSync(pipePath, pipeWithPrefixFixture);

				await runCommand(pipePath);

				const pipeSpecPath = path.join(
					getSrcDirectoryPath(),
					'format-number.pipe.spec.ts',
				);
				assertItExists(
					pipeSpecPath,
					`Spec file should have been created at ${pipeSpecPath}`,
				);
			});

			test('should open the pipe spec file after the command is executed', async () => {
				const showTextDocumentStub = sandbox.stub(
					vscode.window,
					'showTextDocument',
				);
				const pipePath = path.join(
					getSrcDirectoryPath(),
					'format-number.pipe.ts',
				);
				fs.writeFileSync(pipePath, pipeWithPrefixFixture);

				await runCommand(pipePath);

				assert.ok(
					showTextDocumentStub.calledOnce,
					'Should call the showTextDocument function once',
				);
			});

			test('should generate a spec file for a directive', async () => {
				const directivePath = path.join(
					getSrcDirectoryPath(),
					'highlight-content-on-hover.directive.ts',
				);
				fs.writeFileSync(directivePath, directiveWithPrefixFixture);

				await runCommand(directivePath);

				const directiveSpecPath = path.join(
					getSrcDirectoryPath(),
					'highlight-content-on-hover.directive.spec.ts',
				);
				assertItExists(
					directiveSpecPath,
					`Spec file should have been created at ${directiveSpecPath}`,
				);
			});

			test('should open the directive spec file after the command is executed', async () => {
				const showTextDocumentStub = sandbox.stub(
					vscode.window,
					'showTextDocument',
				);
				const directivePath = path.join(
					getSrcDirectoryPath(),
					'highlight-content-on-hover.directive.ts',
				);
				fs.writeFileSync(directivePath, directiveWithPrefixFixture);

				await runCommand(directivePath);

				assert.ok(
					showTextDocumentStub.calledOnce,
					'Should call the showTextDocument function once',
				);
			});

			test('should generate a spec file for a service', async () => {
				const servicePath = path.join(
					getSrcDirectoryPath(),
					'user-auth.service.ts',
				);
				fs.writeFileSync(servicePath, httpServiceFixture);

				await runCommand(servicePath);

				const serviceSpecPath = path.join(
					getSrcDirectoryPath(),
					'user-auth.service.spec.ts',
				);
				assertItExists(
					serviceSpecPath,
					`Spec file should have been created at ${serviceSpecPath}`,
				);
			});

			test('should open the service spec file after the command is executed', async () => {
				const showTextDocumentStub = sandbox.stub(
					vscode.window,
					'showTextDocument',
				);
				const servicePath = path.join(
					getSrcDirectoryPath(),
					'user-auth.service.ts',
				);
				fs.writeFileSync(servicePath, httpServiceFixture);

				await runCommand(servicePath);

				assert.ok(
					showTextDocumentStub.calledOnce,
					'Should call the showTextDocument function once',
				);
			});

			test('when the file does not follow the angular file naming guidelines it should render an error message', async () => {
				const showErrorMessageStub = sandbox.stub(
					vscode.window,
					'showErrorMessage',
				);
				const componentPath = path.join(getSrcDirectoryPath(), 'dummy.ts');
				fs.writeFileSync(componentPath, componentWithoutPrefixFixture);

				await runCommand(componentPath);

				assert.ok(
					showErrorMessageStub.calledWith(
						'Make sure your file does follow the Angular style guidelines.',
					),
					'Should call the showErrorMessage function once with the correct message',
				);
			});

			test('when the file has an unsupported suffix it should render an error message ', async () => {
				const showErrorMessageStub = sandbox.stub(
					vscode.window,
					'showErrorMessage',
				);
				const componentPath = path.join(getSrcDirectoryPath(), 'dummy.rat.ts');
				fs.writeFileSync(componentPath, componentWithoutPrefixFixture);

				await runCommand(componentPath);

				assert.ok(
					showErrorMessageStub.calledWith(
						`[generateSpec] Unsupported file type for spec generation: rat (from file: dummy.rat.ts)`,
					),
					'Should call the showErrorMessage function once with the correct message',
				);
			});
		},
	);
});

const runCommand = async (filePath: string) => {
	await executeCommand(
		'angular-toolbox.common-capabilities.generate-spec',
		vscode.Uri.file(`${filePath}`),
	);
};
