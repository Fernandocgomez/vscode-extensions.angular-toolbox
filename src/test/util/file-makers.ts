import * as fs from 'fs/promises';
import * as path from 'path';
import { getAngularCustomTemplatesDirectoryPath } from './directory-path-getters';

export const createTemplateFile = async (templateName: string, templateContent: string) => {
	const templateFilePath = path.join(
		getAngularCustomTemplatesDirectoryPath(),
		`${templateName}.ejs`,
	);

	try {
		await fs.writeFile(templateFilePath, templateContent);
	} catch (error) {
		console.warn(
			`Could not create file ${templateFilePath} (might already exist or other issue): ${error instanceof Error ? error.message : String(error)}`,
		);
	}
};
