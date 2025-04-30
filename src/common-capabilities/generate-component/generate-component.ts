import * as path from 'path';
import * as fs from 'fs';
import {
	openTextFile,
	promptBoolean,
	promptInput,
	showErrorMessage,
	showInformationMessage,
} from '@extensionFramework';
import { isKebabCase, kebabCaseToPascal } from '@utils';
import { getTemplatePath, renderTemplate } from '@templates';
import { generateComponentSpec } from '../generate-component-spec/generate-component-spec';
import { ComponentTemplateData, TemplateFileNames } from '@models';

/**
 * @param folderRightClickedPath /home/fernando/test/src/app
 */
export const generateComponent = async (folderRightClickedPath: string): Promise<void> => {
	const needSelectorPrefix = await promptBoolean({
		prompt: 'Do you want to prefix your component selector?',
		options: ['Yes', 'No'],
	});

	const componentSelectorPrefix = needSelectorPrefix ? await promptForPrefix() : null;

	try {
		const nameInKebabCase = await promptForNameAsKebabCase();
		const componentFilePath = path.join(folderRightClickedPath, `${nameInKebabCase}.component.ts`);

		fs.writeFileSync(
			componentFilePath,
			renderTemplate(
				getTemplatePath(TemplateFileNames.COMPONENT),
				getComponentTemplateData(nameInKebabCase, componentSelectorPrefix),
			),
		);

		showInformationMessage('Component was generated successfully.');

		const shouldGenerateSpecFile = await promptBoolean({
			prompt: 'Do you want to generate the spec file?',
			options: ['Yes', 'No'],
		});

		if (shouldGenerateSpecFile) {
			await generateComponentSpec(componentFilePath);
		}

		await openTextFile(componentFilePath);
	} catch (error: any) {
		showErrorMessage(error.message);
	}
};

const promptForPrefix = async (): Promise<string | null> => {
	return await promptInput({
		prompt: 'Enter component prefix (kebab-case)',
		placeHolder: 'e.g. dashboard',
		validationFn: value =>
			isKebabCase(value) ? null : 'Component prefix must be in kebab-case format',
		errorMessage: 'Error collecting component prefix',
	});
};

/**
 * prompt user for component name in Kebab case if not name is provide or if the user type the esc key a error is thrown.
 */
const promptForNameAsKebabCase = async (): Promise<string> => {
	const nameInKebabCase = await promptInput({
		prompt: 'Enter component name (kebab-case)',
		placeHolder: 'e.g. user-profile',
		validationFn: value =>
			isKebabCase(value) ? null : 'Component name must be in kebab-case format',
	});

	if (!nameInKebabCase) {
		throw new Error('Error collecting component name');
	}

	return nameInKebabCase;
};

const getComponentTemplateData = (
	nameInKebabCase: string,
	componentSelectorPrefix: string | null,
): ComponentTemplateData => {
	return {
		className: `${kebabCaseToPascal(nameInKebabCase)}Component`,
		selector: componentSelectorPrefix
			? `${componentSelectorPrefix}-${nameInKebabCase}`
			: `${nameInKebabCase}`,
		componentNameAsKebabCase: nameInKebabCase,
	};
};
