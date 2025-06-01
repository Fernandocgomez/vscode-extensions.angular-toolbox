import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import {
	removeSrcDirectory,
	createPromptStub,
	executeCommand,
	getSrcDirectoryPath,
	makeSrcDirectory,
	makeAngularCustomTemplatesDirectory,
	createTemplateFile,
	removeAngularCustomTemplatesDirectory,
} from '../util';
import * as fs from 'fs';
import * as path from 'path';
import {
	componentSpecFixture,
	componentWithoutPrefixFixture,
	componentWithoutPrefixGeneratedUsingCustomTemplateFixture,
	componentWithPrefixFixture,
} from './fixtures';
import { customComponentTemplateTestingData } from './custom-templates-testing-data';

suite('Generate Component', () => {
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
		'when running the "gdlc-angular-toolbox.common-capabilities.generate-component" command',
		() => {
			test('should generate a component and spec file', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Do you want to prefix your component selector?"
					.inputBox('prefix') // 2. "Enter component prefix (kebab-case)"
					.inputBox('dummy') // 3. "Enter component name (kebab-case)"
					.quickPick('Yes') // 4. "Do you want to generate the spec file?"
					.apply();

				await executeCommand(
					'gdlc-angular-toolbox.common-capabilities.generate-component',
					vscode.Uri.file(getSrcDirectoryPath()),
				);

				const componentPath = path.join(getSrcDirectoryPath(), 'dummy.component.ts');
				const specPath = path.join(getSrcDirectoryPath(), 'dummy.component.spec.ts');

				assert.ok(fs.existsSync(componentPath), `Component file should exist at ${componentPath}`);
				assert.ok(fs.existsSync(specPath), `Spec file should exist at ${specPath}`);

				const generatedComponentContent = fs.readFileSync(componentPath, 'utf-8');
				const generatedSpecContent = fs.readFileSync(specPath, 'utf-8');

				assert.strictEqual(
					generatedComponentContent.replace(/\r\n/g, '\n'),
					componentWithPrefixFixture.replace(/\r\n/g, '\n'),
					'Generated component content does not match fixture.',
				);
				assert.strictEqual(
					generatedSpecContent.replace(/\r\n/g, '\n'),
					componentSpecFixture.replace(/\r\n/g, '\n'),
					'Generated spec content does not match fixture.',
				);
			});

			test('should generate a component file only if the user select "No" on the "Do you want to generate the spec file?" question', async () => {
				createPromptStub(sandbox)
					.quickPick('Yes') // 1. "Do you want to prefix your component selector?"
					.inputBox('prefix') // 2. "Enter component prefix (kebab-case)"
					.inputBox('dummy') // 3. "Enter component name (kebab-case)"
					.quickPick('No') // 4. "Do you want to generate the spec file?"
					.apply();

				await executeCommand(
					'gdlc-angular-toolbox.common-capabilities.generate-component',
					vscode.Uri.file(getSrcDirectoryPath()),
				);

				const componentPath = path.join(getSrcDirectoryPath(), 'dummy.component.ts');
				const specPath = path.join(getSrcDirectoryPath(), 'dummy.component.spec.ts');

				assert.ok(fs.existsSync(componentPath), `Component file should exist at ${componentPath}`);
				assert.strictEqual(
					fs.existsSync(specPath),
					false,
					`Spec file should NOT exist at ${specPath}`,
				);

				const generatedComponentContent = fs.readFileSync(componentPath, 'utf-8');

				assert.strictEqual(
					generatedComponentContent.replace(/\r\n/g, '\n'),
					componentWithPrefixFixture.replace(/\r\n/g, '\n'),
					'Generated component content does not match fixture.',
				);
			});

			test('should generate a component file only without prefix if the user select "No" on the "Do you want to prefix your component selector?" question', async () => {
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Do you want to prefix your component selector?"
					.inputBox('dummy') // 2. "Enter component name (kebab-case)"
					.quickPick('No') // 3. "Do you want to generate the spec file?"
					.apply();

				await executeCommand(
					'gdlc-angular-toolbox.common-capabilities.generate-component',
					vscode.Uri.file(getSrcDirectoryPath()),
				);

				const componentPath = path.join(getSrcDirectoryPath(), 'dummy.component.ts');
				const specPath = path.join(getSrcDirectoryPath(), 'dummy.component.spec.ts');

				assert.ok(fs.existsSync(componentPath), `Component file should exist at ${componentPath}`);
				assert.strictEqual(
					fs.existsSync(specPath),
					false,
					`Spec file should NOT exist at ${specPath}`,
				);

				const generatedComponentContent = fs.readFileSync(componentPath, 'utf-8');

				assert.strictEqual(
					generatedComponentContent.replace(/\r\n/g, '\n'),
					componentWithoutPrefixFixture.replace(/\r\n/g, '\n'),
					'Generated component content does not match fixture.',
				);
			});

			test('should generate a component file only, but using a custom template when the user provide it', async () => {
				await makeAngularCustomTemplatesDirectory();
				await createTemplateFile('component', customComponentTemplateTestingData);
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Do you want to prefix your component selector?"
					.inputBox('dummy') // 2. "Enter component name (kebab-case)"
					.quickPick('No') // 3. "Do you want to generate the spec file?"
					.apply();

				await executeCommand(
					'gdlc-angular-toolbox.common-capabilities.generate-component',
					vscode.Uri.file(getSrcDirectoryPath()),
				);

				const componentPath = path.join(getSrcDirectoryPath(), 'dummy.component.ts');
				const generatedComponentContent = fs.readFileSync(componentPath, 'utf-8');

				assert.strictEqual(
					generatedComponentContent.replace(/\r\n/g, '\n'),
					componentWithoutPrefixGeneratedUsingCustomTemplateFixture.replace(/\r\n/g, '\n'),
					'Generated component content does not match fixture.',
				);

				await removeAngularCustomTemplatesDirectory();
			});

			test('should show an error message if there is already an existent component with the same name on the directory', async () => {
				fs.writeFileSync(path.join(getSrcDirectoryPath(), 'dummy.component.ts'), 'dummy content');
				const showErrorMessageStub = sandbox.stub(vscode.window, 'showErrorMessage');
				createPromptStub(sandbox)
					.quickPick('No') // 1. "Do you want to prefix your component selector?"
					.inputBox('dummy') // 2. "Enter component name (kebab-case)"
					.quickPick('No') // 3. "Do you want to generate the spec file?"
					.apply();

				await executeCommand(
					'gdlc-angular-toolbox.common-capabilities.generate-component',
					vscode.Uri.file(getSrcDirectoryPath()),
				);
				assert.ok(
					showErrorMessageStub.calledOnce,
					'Should call the showErrorMessage function once',
				);
			});
		},
	);
});
