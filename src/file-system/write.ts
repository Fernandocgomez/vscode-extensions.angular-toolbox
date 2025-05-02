import * as fs from 'fs';

/**
 * Throws an error when for wherever reason it fails to create the files.
 * @param filePath - Absolute path where the file should be created.
 * @param content - content inside the file.
 */
export const writeFileSync = (filePath: string, content: string): void => {
	try {
		fs.writeFileSync(filePath, content);
	} catch (error) {
		throw new Error('An error has occurred creating file.');
	}
};
