import * as fs from 'fs/promises';
import * as path from 'path';
import { getAngularToolboxDirectoryPath } from './directory-path-getters';
import { ExtensionConfig } from '@models';

export const createTemplateFile = async (
	templateName: string,
	templateContent: string,
) => {
	const templateFilePath = path.join(
		getAngularToolboxDirectoryPath(),
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

export const createConfig = async (config: ExtensionConfig) => {
	const configPath = path.join(getAngularToolboxDirectoryPath(), 'config.json');

	try {
		await fs.writeFile(configPath, JSON.stringify(config, null, 2));
	} catch (error) {
		console.warn(
			`Could not create file ${configPath} (might already exist or other issue): ${error instanceof Error ? error.message : String(error)}`,
		);
	}
};
