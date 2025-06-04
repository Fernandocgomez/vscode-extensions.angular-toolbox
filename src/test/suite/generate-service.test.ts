import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as sinon from 'sinon';
import {
	executeCommand,
	getSrcDirectoryPath,
	makeSrcDirectory,
	removeSrcDirectory,
} from '../util';

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
			test('should generate a service file and a spec file if the user select "Yes" to the question "Do you want to generate the spec file?', async () => {});

			test('should generate a service file only if the user select "No" to the question "Do you want to generate the spec file?"', async () => {});

			test('should add the "Service" suffix to the class name if the user select "Yes" to the question "Is this service an HTTP one"', async () => {});

			test('should not add the "Service" suffix to the class name if the user select "No" to the question "Is this service an HTTP one"', async () => {});

			test('should add the "providedIn" property on the Service decorator equals to  "root" if the user selects "Yes" to the question "Is this service global?"', async () => {});

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
