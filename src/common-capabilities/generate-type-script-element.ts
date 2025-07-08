import { openTextFile, showInformationMessage } from '@extensionFramework';
import { throwExceptionWhenFileExist, writeFileSync } from '@fileSystem';
import { toKebabCase, toPascalCase } from '@utils';
import * as path from 'path';
import { appendToIndex, promptForName } from './util';
import { TypeScriptElement } from './models';

export const generateTypeScriptElement = async (
	folderRightClickedPath: string,
	elementName: TypeScriptElement,
): Promise<void> => {
	const name = await promptForName(elementName, 'error-handler');

	const filePath = path.join(
		folderRightClickedPath,
		`${toKebabCase(name)}.${elementName}.ts`,
	);

	throwExceptionWhenFileExist(filePath);

	writeFileSync(
		filePath,
		`export ${elementName} ${toPascalCase(name)} ${elementName === 'type' ? ` = '';` : '{}'}`,
	);

	appendToIndex(folderRightClickedPath, path.basename(filePath));

	showInformationMessage(
		`${elementName.charAt(0).toUpperCase() + elementName.slice(1)} was generated successfully.`,
	);

	await openTextFile(filePath);
};
