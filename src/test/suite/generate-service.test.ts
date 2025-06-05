import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as sinon from 'sinon';
import {
	assertItDoesNotExists,
	assertItExists,
	assertStrictEqual,
	createPromptStub,
	createTemplateFile,
	executeCommand,
	getSrcDirectoryPath,
	makeAngularCustomTemplatesDirectory,
	makeSrcDirectory,
	removeSrcDirectory,
} from '../util';
import {
	customNoneHttpTemplateServiceFixture,
	globalServiceFixture,
	httpServiceFixture,
	noneGlobalServiceFixture,
	noneHttpServiceFixture,
	customNoneHttpServiceFixture,
	customNoneHttpServiceSpecTemplateFixture,
	customNoneHttpServiceSpecFixture,
	customHttpServiceFixture,
	customHttpServiceTemplateFixture,
	customHttpServiceSpecTemplateFixture,
	customHttpServiceSpecFixture,
} from './fixtures';

suite('Generate Service Test Suite', () => {
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
		'when running the "gdlc-angular-toolbox.common-capabilities.generate-service" command',
		() => {
			test('should generate a service file and a spec file if the user select "Yes" to the question "Do you want to generate the spec file?', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Is this service global?"
					.quickPick('Yes') // 2. "Is this service an HTTP one?"
					.inputBox('user-auth') // 3. "Enter service name (kebab-case)"
					.quickPick('Yes') // 4. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				const servicePath = path.join(
					getSrcDirectoryPath(),
					'user-auth.service.ts',
				);
				const specPath = path.join(
					getSrcDirectoryPath(),
					'user-auth.service.spec.ts',
				);
				assertItExists(
					servicePath,
					`Service file should exist at ${servicePath}`,
				);
				assertItExists(specPath, `Spec file should exist at ${specPath}`);
			});

			test('should generate a service file only if the user select "No" to the question "Do you want to generate the spec file?"', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Is this service global?"
					.quickPick('Yes') // 2. "Is this service an HTTP one?"
					.inputBox('user-auth') // 3. "Enter service name (kebab-case)"
					.quickPick('No') // 4. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				const specPath = path.join(
					getSrcDirectoryPath(),
					'user-auth.service.spec.ts',
				);
				assertItDoesNotExists(
					specPath,
					`Spec file should exist at ${specPath}`,
				);
			});

			test('should add the "Service" suffix to the class name if the user select "Yes" to the question "Is this service an HTTP one"', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Is this service global?"
					.quickPick('Yes') // 2. "Is this service an HTTP one?"
					.inputBox('user-auth') // 3. "Enter service name (kebab-case)"
					.quickPick('No') // 4. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'user-auth.service.ts'),
					httpServiceFixture,
					'Generated service content does not match fixture.',
				);
			});

			test('should not add the "Service" suffix to the class name if the user select "No" to the question "Is this service an HTTP one"', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Is this service global?"
					.quickPick('No') // 2. "Is this service an HTTP one?"
					.inputBox('logger') // 3. "Enter service name (kebab-case)"
					.quickPick('No') // 4. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'logger.service.ts'),
					noneHttpServiceFixture,
					'Generated service content does not match fixture.',
				);
			});

			test('should add the "providedIn" property on the Service decorator equals to  "root" if the user selects "Yes" to the question "Is this service global?"', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Is this service global?"
					.quickPick('No') // 2. "Is this service an HTTP one?"
					.inputBox('logger') // 3. "Enter service name (kebab-case)"
					.quickPick('No') // 4. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'logger.service.ts'),
					globalServiceFixture,
					'Generated service content does not match fixture.',
				);
			});

			test('should not add the "providedIn" property on the Service decorator if the user selects "No" to the question "Is this service global?"', async () => {
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Is this service global?"
					.quickPick('No') // 2. "Is this service an HTTP one?"
					.inputBox('logger') // 3. "Enter service name (kebab-case)"
					.quickPick('No') // 4. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'logger.service.ts'),
					noneGlobalServiceFixture,
					'Generated service content does not match fixture.',
				);
			});

			test('should generate a "Service" using the custom none http template when the user provides one', async () => {
				await makeAngularCustomTemplatesDirectory();
				await createTemplateFile(
					'service',
					customNoneHttpTemplateServiceFixture,
				);
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Is this service global?"
					.quickPick('No') // 2. "Is this service an HTTP one?"
					.inputBox('logger') // 3. "Enter service name (kebab-case)"
					.quickPick('No') // 4. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'logger.service.ts'),
					customNoneHttpServiceFixture,
					'Generated service content does not match fixture.',
				);
			});

			test('should generate a spec file using the none http custom template when the user provides one', async () => {
				await makeAngularCustomTemplatesDirectory();
				await createTemplateFile(
					'service.spec',
					customNoneHttpServiceSpecTemplateFixture,
				);
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Is this service global?"
					.quickPick('No') // 2. "Is this service an HTTP one?"
					.inputBox('logger') // 3. "Enter service name (kebab-case)"
					.quickPick('Yes') // 4. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'logger.service.spec.ts'),
					customNoneHttpServiceSpecFixture,
					'Generated spec service content does not match fixture.',
				);
			});

			test('should generate a "Service" using the custom http template when the user provides one', async () => {
				await makeAngularCustomTemplatesDirectory();
				await createTemplateFile(
					'http.service',
					customHttpServiceTemplateFixture,
				);
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Is this service global?"
					.quickPick('Yes') // 2. "Is this service an HTTP one?"
					.inputBox('user-auth') // 3. "Enter service name (kebab-case)"
					.quickPick('No') // 4. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'user-auth.service.ts'),
					customHttpServiceFixture,
					'Generated service content does not match fixture.',
				);
			});

			test('should generate a spec file using the http custom template when the user provides one', async () => {
				await makeAngularCustomTemplatesDirectory();
				await createTemplateFile(
					'http.service.spec',
					customHttpServiceSpecTemplateFixture,
				);
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Is this service global?"
					.quickPick('Yes') // 2. "Is this service an HTTP one?"
					.inputBox('user-auth') // 3. "Enter service name (kebab-case)"
					.quickPick('Yes') // 4. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'user-auth.service.spec.ts'),
					customHttpServiceSpecFixture,
					'Generated service content does not match fixture.',
				);
			});

			test('should show an error message if there is already a "Service" with the same file name on the directory', async () => {
				fs.writeFileSync(
					path.join(getSrcDirectoryPath(), 'user-auth.service.ts'),
					'dummy content',
				);
				const showErrorMessageStub = sandbox.stub(
					vscode.window,
					'showErrorMessage',
				);
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Is this service global?"
					.quickPick('Yes') // 2. "Is this service an HTTP one?"
					.inputBox('user-auth') // 3. "Enter service name (kebab-case)"
					.quickPick('Yes') // 4. "Do you want to generate the spec file?"
					.apply();

				await runCommand();

				assert.ok(
					showErrorMessageStub.calledOnce,
					'Should call the showErrorMessage function once',
				);
			});
		},
	);
});

const runCommand = async () => {
	await executeCommand(
		'gdlc-angular-toolbox.common-capabilities.generate-service',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};
