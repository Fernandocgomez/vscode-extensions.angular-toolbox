import * as sinon from 'sinon';
import * as vscode from 'vscode';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import {
	assertItDoesNotExists,
	assertItExists,
	assertStrictEqual,
	createConfig,
	createPromptStub,
	executeCommand,
	getSrcDirectoryPath,
	makeAngularToolboxDirectory,
	makeSrcDirectory,
	removeAngularCustomTemplatesDirectory,
	removeSrcDirectory,
} from '../util';
import { routeGuardFixture, routeGuardSpecFixture } from './fixtures';

suite('Generate Route Guard', () => {
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
		'when running the "angular-toolbox.common-capabilities.generate-route-guard" command',
		() => {
			test('should generate a route guard file and spec file', async () => {
				createPromptStub(sandbox)
					.inputBox('dummy') // "Enter guard name (kebab-case, camel-case or pascal-case)"
					.apply();

				await runCommand();

				const guardPath = path.join(getSrcDirectoryPath(), 'dummy.guard.ts');
				const specPath = path.join(
					getSrcDirectoryPath(),
					'dummy.guard.spec.ts',
				);

				assertItExists(
					guardPath,
					`Route guard file should exist at ${guardPath}`,
				);
				assertItExists(specPath, `Spec file should exist at ${specPath}`);
				assertStrictEqual(
					guardPath,
					routeGuardFixture,
					'Generated route guard content does not match fixture',
				);
				assertStrictEqual(
					specPath,
					routeGuardSpecFixture,
					'Generated spec content does not match fixture',
				);
			});

			test('should show an error message if there is already an existent route guard with the same name on the directory', async () => {
				fs.writeFileSync(
					path.join(getSrcDirectoryPath(), 'dummy.guard.ts'),
					'dummy content',
				);
				const showErrorMessageStub = sandbox.stub(
					vscode.window,
					'showErrorMessage',
				);
				createPromptStub(sandbox)
					.inputBox('dummy') // "Enter guard name (kebab-case, camel-case or pascal-case)"
					.apply();

				await runCommand();

				assert.ok(
					showErrorMessageStub.calledOnce,
					'Should call the showErrorMessage function once',
				);
			});

			test('should generate a route guard file when the guard name is in camelCase', async () => {
				createPromptStub(sandbox)
					.inputBox('myTest') // "Enter guard name (kebab-case, camel-case or pascal-case)"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'my-test.guard.ts'),
					routeGuardFixture
						.replace(/dummyGuard/g, 'myTestGuard')
						.replace(/dummy/g, 'my-test'),
					'Generated route guard content does not match fixture for camelCase input',
				);
				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'my-test.guard.spec.ts'),
					routeGuardSpecFixture
						.replace(/dummyGuard/g, 'myTestGuard')
						.replace(/dummy/g, 'my-test'),
					'Generated spec content does not match fixture for camelCase input',
				);
			});

			test('should generate a route guard file when the guard name is in kebab-case', async () => {
				createPromptStub(sandbox)
					.inputBox('my-test') // "Enter guard name (kebab-case, camel-case or pascal-case)"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'my-test.guard.ts'),
					routeGuardFixture
						.replace(/dummyGuard/g, 'myTestGuard')
						.replace(/dummy/g, 'my-test'),
					'Generated route guard content does not match fixture for kebab-case input',
				);
				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'my-test.guard.spec.ts'),
					routeGuardSpecFixture
						.replace(/dummyGuard/g, 'myTestGuard')
						.replace(/dummy/g, 'my-test'),
					'Generated spec content does not match fixture for kebab-case input',
				);
			});

			test('should generate a route guard file when the guard name is in PascalCase', async () => {
				createPromptStub(sandbox)
					.inputBox('MyTest') // "Enter guard name (kebab-case, camel-case or pascal-case)"
					.apply();

				await runCommand();

				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'my-test.guard.ts'),
					routeGuardFixture
						.replace(/dummyGuard/g, 'myTestGuard')
						.replace(/dummy/g, 'my-test'),
					'Generated route guard content does not match fixture for PascalCase input',
				);
				assertStrictEqual(
					path.join(getSrcDirectoryPath(), 'my-test.guard.spec.ts'),
					routeGuardSpecFixture
						.replace(/dummyGuard/g, 'myTestGuard')
						.replace(/dummy/g, 'my-test'),
					'Generated spec content does not match fixture for PascalCase input',
				);
			});

			suite('and the user provides a custom config', () => {
				test('should not generate the spec file if the config skipSpec is true', async () => {
					await makeAngularToolboxDirectory();
					await createConfig({
						skipSpec: true,
					});
					createPromptStub(sandbox)
						.inputBox('dummy') // "Enter guard name (kebab-case, camel-case or pascal-case)"
						.apply();

					await runCommand();

					const specPath = path.join(
						getSrcDirectoryPath(),
						'dummy.guard.spec.ts',
					);
					assertItDoesNotExists(
						specPath,
						`Route guard spec file should not exist at ${specPath}`,
					);
					await removeAngularCustomTemplatesDirectory();
				});
			});
		},
	);
});

const runCommand = async () => {
	await executeCommand(
		'angular-toolbox.common-capabilities.generate-route-guard',
		vscode.Uri.file(getSrcDirectoryPath()),
	);
};
