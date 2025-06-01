import * as fs from 'fs/promises';
import {
	getAngularCustomTemplatesDirectoryPath,
	getSrcDirectoryPath,
} from './directory-path-getters';

export const makeSrcDirectory = async () => {
	const srcFolderPath = getSrcDirectoryPath();

	try {
		await fs.mkdir(srcFolderPath, { recursive: true });
	} catch (error) {
		console.warn(
			`Could not create ${srcFolderPath} (might already exist or other issue): ${error instanceof Error ? error.message : String(error)}`,
		);
	}
};

export const makeAngularCustomTemplatesDirectory = async () => {
	const angularCustomTemplatesFolderPath = getAngularCustomTemplatesDirectoryPath();

	try {
		await fs.mkdir(angularCustomTemplatesFolderPath, { recursive: true });
	} catch (error) {
		console.warn(
			`Could not create ${angularCustomTemplatesFolderPath} (might already exist or other issue): ${error instanceof Error ? error.message : String(error)}`,
		);
	}
};
