import * as fs from 'fs/promises';
import {
	getAngularCustomTemplatesDirectoryPath,
	getSrcDirectoryPath,
} from './directory-path-getters';

export const removeSrcDirectory = async () => {
	const srcFolderPath = getSrcDirectoryPath();

	try {
		await fs.rm(srcFolderPath, { recursive: true, force: true });
	} catch (error) {
		if (error instanceof Error && 'code' in error && error.code !== 'ENOENT') {
			console.warn(`Remove of ${srcFolderPath} encountered an issue: ${error.message}`);
		}
	}
};

export const removeAngularCustomTemplatesDirectory = async () => {
	const angularCustomTemplatesFolderPath = getAngularCustomTemplatesDirectoryPath();

	try {
		await fs.rm(angularCustomTemplatesFolderPath, { recursive: true, force: true });
	} catch (error) {
		if (error instanceof Error && 'code' in error && error.code !== 'ENOENT') {
			console.warn(
				`Remove of ${angularCustomTemplatesFolderPath} encountered an issue: ${error.message}`,
			);
		}
	}
};
