import {
	openTextFile,
	promptInput,
	showInformationMessage,
} from '@extensionFramework';
import { throwExceptionWhenFileExist, writeFileSync } from '@fileSystem';
import { isCamelKebabPascalCase, toKebabCase, toPascalCase } from '@utils';
import * as path from 'path';
import { appendToIndex } from './util';

export const generateTypeScriptElement = async (
	folderRightClickedPath: string,
	elementName: 'class' | 'interface' | 'enum' | 'type',
): Promise<void> => {
	const name = await promptInput({
		prompt: `Enter ${elementName} name (kebab-case, camel-case or pascal-case)`,
		placeHolder: 'e.g. error-handler',
		validationFn: value =>
			isCamelKebabPascalCase(value)
				? null
				: `${elementName.toUpperCase()} name must be in kebab-case, camel-case, or pascal-case`,
	});

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
