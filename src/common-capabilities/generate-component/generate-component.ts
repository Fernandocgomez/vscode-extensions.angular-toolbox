import * as path from 'path';
import { promptBoolean, promptInput } from '@extensionFramework';
import { isKebabCase, kebabCaseToPascal } from '@utils';
import { generateComponentSpec } from '../generate-component-spec/generate-component-spec';
import { ComponentTemplateData, TemplateFileNames } from '@models';
import { generateElement } from '../generate-element/generate-element';

/**
 * @param folderRightClickedPath /home/fernando/test/src/app
 */
export const generateComponent = async (folderRightClickedPath: string): Promise<void> => {
	const needSelectorPrefix = await promptBoolean({
		prompt: 'Do you want to prefix your component selector?',
		options: ['Yes', 'No'],
	});

	const componentSelectorPrefix = needSelectorPrefix ? await promptForPrefix() : null;

	const nameInKebabCase = await promptForNameAsKebabCase();

	await generateElement(
		path.join(folderRightClickedPath, `${nameInKebabCase}.component.ts`),
		TemplateFileNames.COMPONENT,
		getComponentTemplateData(nameInKebabCase, componentSelectorPrefix),
		generateComponentSpec,
	);
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

const promptForNameAsKebabCase = async (): Promise<string> => {
	return await promptInput({
		prompt: 'Enter component name (kebab-case)',
		placeHolder: 'e.g. user-profile',
		validationFn: value =>
			isKebabCase(value) ? null : 'Component name must be in kebab-case format',
	});
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
