import {
	generateComponent,
	generateComponentStorybook,
	generateDirective,
	generatePipe,
	generateService,
	generateRouteGuard,
	generateSpec,
	registerPrefix,
	seePrefix,
	generateTypeScriptElement,
} from '@commonCapabilities';
import { showErrorMessage } from '@extensionFramework';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const generateComponentDisposable = vscode.commands.registerCommand(
		'angular-toolbox.common-capabilities.generate-component',
		async (arg: vscode.Uri) => {
			try {
				await generateComponent(arg.fsPath);
			} catch (error: any) {
				showErrorMessage(error.message);
			}
		},
	);

	const generateServiceDisposable = vscode.commands.registerCommand(
		'angular-toolbox.common-capabilities.generate-service',
		async (arg: vscode.Uri) => {
			try {
				await generateService(arg.fsPath);
			} catch (error: any) {
				showErrorMessage(error.message);
			}
		},
	);

	const generatePipeDisposable = vscode.commands.registerCommand(
		'angular-toolbox.common-capabilities.generate-pipe',
		async (arg: vscode.Uri) => {
			try {
				await generatePipe(arg.fsPath);
			} catch (error: any) {
				showErrorMessage(error.message);
			}
		},
	);

	const generateDirectiveDisposable = vscode.commands.registerCommand(
		'angular-toolbox.common-capabilities.generate-directive',
		async (arg: vscode.Uri) => {
			try {
				await generateDirective(arg.fsPath);
			} catch (error: any) {
				showErrorMessage(error.message);
			}
		},
	);

	const registerPrefixDisposable = vscode.commands.registerCommand(
		'angular-toolbox.common-capabilities.register-prefix',
		async () => {
			try {
				await registerPrefix();
			} catch (error: any) {
				showErrorMessage(error.message);
			}
		},
	);

	const seePrefixDisposable = vscode.commands.registerCommand(
		'angular-toolbox.common-capabilities.see-prefix',
		async () => {
			try {
				await seePrefix();
			} catch (error: any) {
				showErrorMessage(error.message);
			}
		},
	);

	const generateComponentStoryDisposable = vscode.commands.registerCommand(
		'angular-toolbox.common-capabilities.generate-component-storybook',
		async (arg: vscode.Uri) => {
			try {
				await generateComponentStorybook(arg.fsPath, true);
			} catch (error: any) {
				showErrorMessage(error.message);
			}
		},
	);

	const generateSpecDisposable = vscode.commands.registerCommand(
		'angular-toolbox.common-capabilities.generate-spec',
		async (arg: vscode.Uri) => {
			try {
				await generateSpec(arg.fsPath);
			} catch (error: any) {
				showErrorMessage(error.message);
			}
		},
	);

	const generateRouteGuardDisposable = vscode.commands.registerCommand(
		'angular-toolbox.common-capabilities.generate-route-guard',
		async (arg: vscode.Uri) => {
			try {
				await generateRouteGuard(arg.fsPath);
			} catch (error: any) {
				showErrorMessage(error.message);
			}
		},
	);

	const generateClassDisposable = vscode.commands.registerCommand(
		'angular-toolbox.common-capabilities.generate-class',
		async (arg: vscode.Uri) => {
			try {
				await generateTypeScriptElement(arg.fsPath, 'class');
			} catch (error: any) {
				showErrorMessage(error.message);
			}
		},
	);

	context.subscriptions.push(
		generateComponentDisposable,
		generateServiceDisposable,
		generatePipeDisposable,
		generateDirectiveDisposable,
		registerPrefixDisposable,
		seePrefixDisposable,
		generateComponentStoryDisposable,
		generateSpecDisposable,
		generateRouteGuardDisposable,
		generateClassDisposable,
	);
}

export function deactivate() {}
