import {
	getComponentDirectivesDependencies,
	getComponentModuleDependencies,
	getComponentPipesDependencies,
	getProviderDependencies,
	getComponentStandaloneComponentDependencies,
} from '@angularDependencyExtractor';
import { ComponentSpecTemplateData, TemplateFileNames } from '@models';
import { readFileSync } from '@fileSystem';
import { generateSpec } from '../generate-spec/generate-spec';

/**
 * @param componentFilePath /home/fernando/test/src/app/my-component.component.ts
 */
export const generateComponentSpec = async (componentFilePath: string): Promise<void> => {
	generateSpec(
		componentFilePath.replace(/\.component\.ts$/, '.component.spec.ts'),
		TemplateFileNames.COMPONENT_SPEC,
		getComponentSpecTemplateData(componentFilePath),
	);
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
		providers: getProviderDependencies(fileContent),
		modules: getComponentModuleDependencies(fileContent),
		components: getComponentStandaloneComponentDependencies(fileContent),
		pipes: getComponentPipesDependencies(fileContent),
		directives: getComponentDirectivesDependencies(fileContent),
	};
};
