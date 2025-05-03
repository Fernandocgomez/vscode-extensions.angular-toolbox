import * as fs from 'fs';

/**
 * Return true when the file exist on the path provided.
 * @param filePath - absolute path  - /home/fernando/test/src/app/user-auth.service.ts
 */
export const existsSync = (filePath: string): boolean => {
	return fs.existsSync(filePath);
};

/**
 * @param filePath - absolute path  - /home/fernando/test/src/app/user-auth.service.ts
 * @throws {Error} - when file exist.
 */
export const throwExceptionWhenFileExist = (filePath: string): void => {
	if (existsSync(filePath)) {
		throw new Error('File already exist');
	}
};

/**
 * Read file and return it as string.
 * @throws {Error} - Throws an exception when the files does not exist.
 * @param filePath - absolute path  - /home/fernando/test/src/app/user-auth.service.ts
 */
export const readFileSync = (filePath: string): string => {
	try {
		return fs.readFileSync(filePath, 'utf-8');
	} catch (error) {
		throw new Error('Error when trying to read file content');
	}
};
