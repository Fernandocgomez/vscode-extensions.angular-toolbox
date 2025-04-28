import { getUserRootPath } from '@extensionFramework';
import * as path from 'path';
import * as ejs from 'ejs';
import * as fs from 'fs';

export const getCustomTemplatePath = (templateName: string): string => {
	return path.join(
		getUserRootPath(),
		'.angular-toolbox-templates',
		`${templateName}.ejs`,
	);
};

export const getDefaultTemplatePath = (templateName: string): string => {
	const extensionPath = path.dirname(require.main?.filename || '');

	return path.join(extensionPath, 'src', 'templates', `${templateName}.ejs`);
};

export const renderTemplate = (
	templatePath: string,
	templateData: ejs.Data,
): string => {
	const templateContent = fs.readFileSync(templatePath, 'utf-8');

	return ejs.render(templateContent, templateData);
};
