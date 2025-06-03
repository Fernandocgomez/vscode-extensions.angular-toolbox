import * as fs from 'fs';
import * as assert from 'assert';

export const assertStrictEqual = (
	filePath: string,
	expectedContent: string,
	errorMessage: string,
) => {
	assert.strictEqual(
		fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n'),
		expectedContent.replace(/\r\n/g, '\n'),
		errorMessage,
	);
};

export const assertItExists = (path: string, errorMessage: string) => {
	assert.ok(fs.existsSync(path), errorMessage);
};

export const assertItDoesNotExists = (path: string, errorMessage: string) => {
	assert.ok(!fs.existsSync(path), errorMessage);
};
