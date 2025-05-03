import * as fs from 'fs';

/**
 * @param filePath - Absolute path where the file should be created.
 * @param content - content inside the file.
 * @throws {Error} - Throws an error when for wherever reason it fails to create the files.
 */
export const writeFileSync = (filePath: string, content: string): void => {
	try {
		fs.writeFileSync(filePath, content);
	} catch (error) {
		throw new Error('An error has occurred creating file.');
	}
};
