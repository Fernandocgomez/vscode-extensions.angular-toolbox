import { openTextFile } from '@extensionFramework';
import { throwExceptionWhenFileExist, writeFileSync } from '@fileSystem';
import { ComponentStorybookTemplateData, TemplateFileNames } from '@models';
import { getTemplatePath, renderTemplate } from '@templates';
import { kebabCaseToPascal } from '@utils';
import * as path from 'path';

/**
 * @param fileRightClickedPath /home/fernando/test/src/app/user-profile.component.ts
 */
export const generateComponentStorybook = async (
	fileRightClickedPath: string,
	openFile = false,
) => {
	const nameInKebabCase = fileRightClickedPath
		.split('/')
		.pop()
		?.replace(/\.component\.ts$/, '') as string;

	const storybookFilePath = path.join(
		path.dirname(fileRightClickedPath),
		`${nameInKebabCase}.component.stories.ts`,
	);

	throwExceptionWhenFileExist(storybookFilePath);

	writeFileSync(
		storybookFilePath,
		renderTemplate(getTemplatePath(TemplateFileNames.COMPONENT_STORIES), {
			className: `${kebabCaseToPascal(nameInKebabCase)}Component`,
			componentNameAsKebabCase: nameInKebabCase,
		} as ComponentStorybookTemplateData),
	);

	if (openFile) {
		await openTextFile(storybookFilePath);
	}
};
