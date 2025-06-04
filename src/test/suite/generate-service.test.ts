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
	executeCommand,
	getSrcDirectoryPath,
	makeSrcDirectory,
	removeSrcDirectory,
} from '../util';
import {
	httpServiceFixture,
	noneGlobalServiceFixture,
	noneHttpServiceFixture,
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

			test('should not add the "providedIn" property on the Service decorator if the user selects "No" to the question "Is this service global?"', async () => {});

			test('should generate the "Service" using the default template when the user does not provide a custom one', async () => {});

			test('should generate a "Service" using the custom template when the user provides one', async () => {});

			test('should generate a spec file using the default template when the user does not provide a custom one', async () => {});

			test('should generate a spec file using the custom template when the user provides one', async () => {});

			test('should show an error message if there is already a "Service" with the same file name on the directory', async () => {});
		},
	);
});

const runCommand = async () => {
	await executeCommand(
		'gdlc-angular-toolbox.common-capabilities.generate-service',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};
