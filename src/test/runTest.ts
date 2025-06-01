import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to --extensionDevelopmentPath
		const extensionDevelopmentPath = path.resolve(__dirname, '../../../');

		// The path to the extension test script
		// Passed to --extensionTestsPath
		// This will point to `out/test/suite/index.js` after compilation
		const extensionTestsPath = path.resolve(__dirname, './suite/index');

		// Download VS Code, unzip it and run the integration test
		await runTests({
			extensionDevelopmentPath,
			extensionTestsPath,
		});
	} catch (err: any) {
		console.error(`Failed to run tests: ${err.message}`);
		process.exit(1);
	}
}

main();
