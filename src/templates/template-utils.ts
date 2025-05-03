import { getUserRootPath } from '@extensionFramework';
import * as path from 'path';
import * as ejs from 'ejs';
import { readFileSync, existsSync } from '@fileSystem';

/**
 * Get template absolute path.
 * If user has not provide a directory with custom templates,
 * it uses the default ones under src/template
 * @param templateName - file name without .ejs extension.
 * @throws {Error} - Throws an exception if the extension does not have access to read user files.
 */
export const getTemplatePath = (templateName: string): string => {
	const customTemplatePath = getCustomTemplatePath(templateName);

	if (existsSync(customTemplatePath)) {
		return customTemplatePath;
	} else {
		return getDefaultTemplatePath(templateName);
	}
};

/**
 * Return rendered dynamic template.
 * @param templatePath - Absolute path to template file.
 * @param templateData - object used to populate the template.
 * @throws {Error} - Throws an exception when there an issue reading the template.
 */
export const renderTemplate = (templatePath: string, templateData: object): string => {
	return ejs.render(readFileSync(templatePath), templateData);
};

const getCustomTemplatePath = (templateName: string): string => {
	return path.join(getUserRootPath(), '.angular-toolbox-templates', `${templateName}.ejs`);
};

const getDefaultTemplatePath = (templateName: string): string => {
	const extensionPath = path.dirname(require.main?.filename || '');

	return path.join(extensionPath, 'src', 'templates', `${templateName}.ejs`);
};
