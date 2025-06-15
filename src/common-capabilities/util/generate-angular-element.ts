import * as path from 'path';
import { getExtensionJsonBaseConfigService } from '@extensionConfig';
import { openTextFile, showInformationMessage } from '@extensionFramework';
import { throwExceptionWhenFileExist, writeFileSync } from '@fileSystem';
import { TemplateFileNames } from '@models';
import { getTemplatePath, renderTemplate } from '@templates';
import { appendToIndex } from './append-to-index';

export const generateAngularElement = async (
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

	appendToIndex(
		getFolderRightClickedPath(filePath),
		getFileNameWithoutExtension(filePath),
	);

	showInformationMessage(`${templateName} was generated successfully.`);

	if (!getExtensionJsonBaseConfigService().skipSpec()) {
		await generateSpecFn(filePath);
	}

	await openTextFile(filePath);
};

const getFolderRightClickedPath = (filePath: string) => path.dirname(filePath);
const getFileNameWithoutExtension = (filePath: string) =>
	path.basename(filePath, '.ts');
