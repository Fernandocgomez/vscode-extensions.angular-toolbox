import { getUserRootPath } from '@extensionFramework';
import * as path from 'path';
import * as ejs from 'ejs';
import * as fs from 'fs';

export const getTemplate = (templateName: string): string => {
	const customTemplatePath = getCustomTemplatePath(templateName);

	if (fs.existsSync(customTemplatePath)) {
		return customTemplatePath;
	} else {
		return getDefaultTemplatePath(templateName);
	}
};

export const renderTemplate = (templatePath: string, templateData: ejs.Data): string => {
	const templateContent = fs.readFileSync(templatePath, 'utf-8');

	return ejs.render(templateContent, templateData);
};

const getCustomTemplatePath = (templateName: string): string => {
	return path.join(getUserRootPath(), '.angular-toolbox-templates', `${templateName}.ejs`);
};

const getDefaultTemplatePath = (templateName: string): string => {
	const extensionPath = path.dirname(require.main?.filename || '');

	return path.join(extensionPath, 'src', 'templates', `${templateName}.ejs`);
};
