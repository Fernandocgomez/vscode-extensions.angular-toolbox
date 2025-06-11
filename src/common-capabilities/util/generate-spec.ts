import { showInformationMessage } from '@extensionFramework';
import { throwExceptionWhenFileExist, writeFileSync } from '@fileSystem';
import { getTemplatePath, renderTemplate } from '@templates';

export const generateSpec = async (
	specFilePath: string,
	templateName: string,
	templateData: object,
) => {
	throwExceptionWhenFileExist(specFilePath);

	writeFileSync(specFilePath, renderTemplate(getTemplatePath(templateName), templateData));

	showInformationMessage('Spec was generated successfully.');
};
