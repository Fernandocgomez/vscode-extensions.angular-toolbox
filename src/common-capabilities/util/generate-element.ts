import {
	openTextFile,
	promptBoolean,
	showInformationMessage,
} from '@extensionFramework';
import { throwExceptionWhenFileExist, writeFileSync } from '@fileSystem';
import { TemplateFileNames } from '@models';
import { getTemplatePath, renderTemplate } from '@templates';

export const generateElement = async (
	filePath: string,
	templateName: TemplateFileNames,
	templateData: object,
	generateSpecFn: (filePath: string) => Promise<void>,
	skipSpec: boolean,
) => {
	throwExceptionWhenFileExist(filePath);

	writeFileSync(
		filePath,
		renderTemplate(getTemplatePath(templateName), templateData),
	);

	showInformationMessage(`${templateName} was generated successfully.`);

	if (!skipSpec) {
		const shouldGenerateSpecFile = await promptBoolean({
			prompt: 'Do you want to generate the spec file?',
			options: ['Yes', 'No'],
		});

		if (shouldGenerateSpecFile) {
			await generateSpecFn(filePath);
		}
	}

	await openTextFile(filePath);
};
