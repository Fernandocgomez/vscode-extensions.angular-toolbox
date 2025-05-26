import {
	getComponentDirectivesDependencies,
	getComponentModuleDependencies,
	getComponentPipesDependencies,
	getComponentProviderDependencies,
	getComponentStandaloneComponentDependencies,
} from '@angularDependencyExtractor';
import { ComponentSpecTemplateData, TemplateFileNames } from '@models';
import { getTemplatePath, renderTemplate } from '@templates';
import { showInformationMessage } from '@extensionFramework';
import { readFileSync, throwExceptionWhenFileExist, writeFileSync } from '@fileSystem';

/**
 * @param componentFilePath /home/fernando/test/src/app/my-component.component.ts
 */
export const generateComponentSpec = async (componentFilePath: string): Promise<void> => {
	const componentSpecFilePath = componentFilePath.replace(/\.component\.ts$/, '.component.spec.ts');

	throwExceptionWhenFileExist(componentSpecFilePath);

	writeFileSync(
		componentSpecFilePath,
		renderTemplate(
			getTemplatePath(TemplateFileNames.COMPONENT_SPEC),
			getComponentSpecTemplateData(componentFilePath),
		),
	);

	showInformationMessage('Spec was generated successfully.');
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
	const fileContent = readFileSync(componentFilePath);

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
