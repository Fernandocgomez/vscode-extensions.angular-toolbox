import * as path from 'path';
import { isKebabCase, kebabCaseToPascal, toKebabCase } from '@utils';
import {
	ComponentSpecTemplateData,
	ComponentTemplateData,
	TemplateFileNames,
} from '@models';
import { generateAngularElement, generateSpec, promptForName } from './util';
import {
	getComponentDirectivesDependencies,
	getComponentModuleDependencies,
	getComponentPipesDependencies,
	getProviderDependencies,
	getComponentStandaloneComponentDependencies,
} from '@angularDependencyExtractor';
import { readFileSync, writeFileSync } from '@fileSystem';
import { getExtensionJsonBaseConfigService } from '@extensionConfig';
import { promptForPrefix } from './util/prompt-for-prefix';
import { generateComponentStorybook } from './generate-component-storybook';
import { AngularElement } from './models';

/**
 * @param folderRightClickedPath /home/fernando/test/src/app
 */
export const generateComponent = async (
	folderRightClickedPath: string,
): Promise<void> => {
	const prefix = await promptForPrefix(value =>
		isKebabCase(value) ? null : 'Component prefix must be in kebab-case format',
	);
	const nameInKebabCase = toKebabCase(
		await promptForName(AngularElement.COMPONENT, 'user-profile'),
	);

	await generateAngularElement(
		path.join(folderRightClickedPath, `${nameInKebabCase}.component.ts`),
		TemplateFileNames.COMPONENT,
		getComponentTemplateData(nameInKebabCase, prefix),
		generateComponentSpec,
	);

	if (!getExtensionJsonBaseConfigService().componentHasInlineTemplate()) {
		writeFileSync(
			path.join(folderRightClickedPath, `${nameInKebabCase}.component.html`),
			'',
		);
	}

	if (!getExtensionJsonBaseConfigService().componentHasInlineStyle()) {
		writeFileSync(
			path.join(
				folderRightClickedPath,
				`${nameInKebabCase}.component.${getExtensionJsonBaseConfigService().componentStylesheetsFormat()}`,
			),
			'',
		);
	}

	if (getExtensionJsonBaseConfigService().componentHasGenerateStory()) {
		await generateComponentStorybook(
			path.join(folderRightClickedPath, `${nameInKebabCase}.component.ts`),
		);
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
		inlineTemplate:
			getExtensionJsonBaseConfigService().componentHasInlineTemplate(),
		inlineStyle: getExtensionJsonBaseConfigService().componentHasInlineStyle(),
		withOnPushChangeDetection:
			getExtensionJsonBaseConfigService().componentHasOnPushChangeDetection(),
		stylesheetsFormat:
			getExtensionJsonBaseConfigService().componentStylesheetsFormat(),
	};
};

/**
 * @param componentFilePath /home/fernando/test/src/app/my-component.component.ts
 */
export const generateComponentSpec = async (
	componentFilePath: string,
): Promise<void> => {
	await generateSpec(
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

const getComponentSpecTemplateData = (
	componentFilePath: string,
): ComponentSpecTemplateData => {
	const fileContent = readFileSync(componentFilePath);

	return {
		className: filePathToClassName(componentFilePath),
		componentNameAsKebabCase:
			filePathToComponentNameAsKebabCase(componentFilePath),
		providers: getProviderDependencies(fileContent),
		modules: getComponentModuleDependencies(fileContent),
		components: getComponentStandaloneComponentDependencies(fileContent),
		pipes: getComponentPipesDependencies(fileContent),
		directives: getComponentDirectivesDependencies(fileContent),
	};
};
