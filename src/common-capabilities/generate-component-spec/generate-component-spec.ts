import * as fs from 'fs';
import {
	getComponentDirectivesDependencies,
	getComponentModuleDependencies,
	getComponentPipesDependencies,
	getComponentProviderDependencies,
	getComponentStandaloneComponentDependencies,
} from '@utils';
import { ComponentSpecTemplateData, TemplateFileNames } from '@models';
import { getTemplate, renderTemplate } from '@templates';
import { showErrorMessage, showInformationMessage } from '@extensionFramework';

/**
 *
 * @param componentFilePath /home/fernando/test/src/app/my-component.component.ts
 */
export const generateComponentSpec = async (componentFilePath: string): Promise<void> => {
	if (!fs.existsSync(componentFilePath)) {
		return;
	}

	try {
		const componentSpecFilePath = componentFilePath.replace(
			/\.component\.ts$/,
			'.component.spec.ts',
		);

		fs.writeFileSync(
			componentSpecFilePath,
			renderTemplate(
				getTemplate(TemplateFileNames.COMPONENT_SPEC),
				getComponentSpecTemplateData(componentFilePath),
			),
		);

		showInformationMessage('Spec was generated successfully.');
	} catch (error: any) {
		showErrorMessage(error.message);
	}
};

/**
 * Convert from /home/fernando/test/src/app/my-cool.component.ts to MyCoolComponent
 * @param filePath
 */
const filePathToClassName = (filePath: string): string => {
	return (
		filePathToComponentNameAsKebabCase(filePath)
			.split('-')
			.map(part => part.charAt(0).toUpperCase() + part.slice(1))
			.join('') + 'Component'
	);
};

/**
 * Convert from /home/fernando/test/src/app/my-cool.component.ts to my-cool
 * @param filePath
 */
const filePathToComponentNameAsKebabCase = (filePath: string): string => {
	return (filePath.split('/').pop() || '').replace(/\.component\.ts$/, '');
};

const getComponentSpecTemplateData = (componentFilePath: string): ComponentSpecTemplateData => {
	const fileContent = fs.readFileSync(componentFilePath, 'utf-8');

	return {
		className: filePathToClassName(componentFilePath),
		componentNameAsKebabCase: filePathToComponentNameAsKebabCase(componentFilePath),
		providers: getComponentProviderDependencies(fileContent),
		modules: getComponentModuleDependencies(fileContent),
		components: getComponentStandaloneComponentDependencies(fileContent),
		pipes: getComponentPipesDependencies(fileContent),
		directives: getComponentDirectivesDependencies(fileContent),
	};
};
