import { getExtensionJsonBaseConfigService } from '@extensionConfig';
import { openTextFile, showInformationMessage } from '@extensionFramework';
import { throwExceptionWhenFileExist, writeFileSync } from '@fileSystem';
import { TemplateFileNames } from '@models';
import { getTemplatePath, renderTemplate } from '@templates';

export const generateElement = async (
	filePath: string,
	templateName: TemplateFileNames,
	templateData: object,
	generateSpecFn: (filePath: string) => Promise<void>,
) => {
	throwExceptionWhenFileExist(filePath);

	writeFileSync(
		filePath,
		renderTemplate(getTemplatePath(templateName), templateData),
	);

	showInformationMessage(`${templateName} was generated successfully.`);

	if (!getExtensionJsonBaseConfigService().skipSpec()) {
		await generateSpecFn(filePath);
	}

	await openTextFile(filePath);
};
