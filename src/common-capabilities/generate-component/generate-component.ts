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
import {
	getCustomTemplatePath,
	getDefaultTemplatePath,
	renderTemplate,
} from '@templates';
import { generateComponentSpec } from '../generate-component-spec/generate-component-spec';

interface ComponentTemplateData {
	className: string;
	selector: string;
	componentNameAsKebabCase: string;
}

/**
 *
 * @param fsPath /home/fernando/test/src/app
 */
export const generateComponent = async (fsPath: string): Promise<void> => {
	const needSelectorPrefix = await promptBoolean({
		prompt: 'Do you want to prefix your component selector?',
		options: ['Yes', 'No'],
	});

	const componentSelectorPrefix = needSelectorPrefix
		? await promptInput({
				prompt: 'Enter component prefix (kebab-case)',
				placeHolder: 'e.g. dashboard',
				validationFn: value =>
					isKebabCase(value)
						? null
						: 'Component prefix must be in kebab-case format',
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

	const componentTemplateData: ComponentTemplateData = {
		className: `${kebabCaseToPascal(nameInKebabCase)}`,
		selector: needSelectorPrefix
			? `${componentSelectorPrefix}-${nameInKebabCase}`
			: `${nameInKebabCase}`,
		componentNameAsKebabCase: nameInKebabCase,
	};

	try {
		const componentFilePath = path.join(
			fsPath,
			`${nameInKebabCase}.component.ts`,
		);
		const customComponentTemplatePath = getCustomTemplatePath('component');

		if (fs.existsSync(customComponentTemplatePath)) {
			fs.writeFileSync(
				componentFilePath,
				renderTemplate(customComponentTemplatePath, componentTemplateData),
			);
		} else {
			fs.writeFileSync(
				componentFilePath,
				renderTemplate(
					getDefaultTemplatePath('component'),
					componentTemplateData,
				),
			);
		}

		showInformationMessage('Component was generated successfully.');

		if (
			await promptBoolean({
				prompt: 'Do you want to generate spec file?',
				options: ['Yes', 'No'],
			})
		) {
			await generateComponentSpec(componentFilePath);
		}

		await openTextFile(componentFilePath);
	} catch (error: any) {
		showErrorMessage(error.message);
	}
};
