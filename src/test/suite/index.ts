import * as path from 'path';
import Mocha = require('mocha');
import { glob } from 'glob';
import {
	ensureExtensionActivated,
	getSrcDirectoryPath,
	removeSrcDirectory,
} from '../util';
import { existsSync } from '@fileSystem';

export function run(): Promise<void> {
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd',
		color: true,
		parallel: true,
	});

	mocha.suite.beforeAll(async function () {
		this.timeout(0);

		await ensureExtensionActivated();

		if (existsSync(getSrcDirectoryPath())) {
			await removeSrcDirectory();
		}
	});

	mocha.suite.afterAll(async function () {
		this.timeout(0);

		if (existsSync(getSrcDirectoryPath())) {
			await removeSrcDirectory();
		}
	});

	const testsRoot = path.resolve(__dirname, '..');

	return new Promise((c, e) => {
		glob('**/**.test.js', { cwd: testsRoot })
			.then(files => {
				// Add files to the test suite
				files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

				try {
					// Run the mocha test
					mocha.run(failures => {
						if (failures > 0) {
							e(new Error(`${failures} tests failed.`));
						} else {
							c();
						}
					});
				} catch (err) {
					e(err);
				}
			})
			.catch(err => {
				return e(err);
			});
	});
}
