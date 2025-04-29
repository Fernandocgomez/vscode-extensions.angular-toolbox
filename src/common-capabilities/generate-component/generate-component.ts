import {
	openTextFile,
	promptBoolean,
	promptInput,
	showErrorMessage,
	showInformationMessage,
} from '@extensionFramework';
import { isKebabCase, kebabCaseToPascal } from '@utils';
import * as path from 'path';
import * as fs from 'fs';
import { getTemplate, renderTemplate } from '@templates';
import { generateComponentSpec } from '../generate-component-spec/generate-component-spec';
import { ComponentTemplateData, TemplateFileNames } from '@models';

/**
 *
 * @param folderRightClickedPath /home/fernando/test/src/app
 */
export const generateComponent = async (folderRightClickedPath: string): Promise<void> => {
	const needSelectorPrefix = await promptBoolean({
		prompt: 'Do you want to prefix your component selector?',
		options: ['Yes', 'No'],
	});

	const componentSelectorPrefix = needSelectorPrefix
		? await promptInput({
				prompt: 'Enter component prefix (kebab-case)',
				placeHolder: 'e.g. dashboard',
				validationFn: value =>
					isKebabCase(value) ? null : 'Component prefix must be in kebab-case format',
				errorMessage: 'Error collecting component prefix',
			})
		: null;

	const nameInKebabCase = await promptInput({
		prompt: 'Enter component name (kebab-case)',
		placeHolder: 'e.g. user-profile',
		validationFn: value =>
			isKebabCase(value) ? null : 'Component name must be in kebab-case format',
		errorMessage: 'Error collecting component name',
	});

	if (!nameInKebabCase) {
		showErrorMessage('Please provide a component name');

		return;
	}

	try {
		const componentFilePath = path.join(folderRightClickedPath, `${nameInKebabCase}.component.ts`);

		fs.writeFileSync(
			componentFilePath,
			renderTemplate(
				getTemplate(TemplateFileNames.COMPONENT),
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
