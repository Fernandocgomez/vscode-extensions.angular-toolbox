import { promptBoolean, promptInput } from '@extensionFramework';
import { camelCaseToKebabCase, isCamelCase } from '@utils';
import { generateElement } from '../generate-element/generate-element';
import * as path from 'path';
import { DirectiveSpecTemplateData, DirectiveTemplateData, TemplateFileNames } from '@models';
import { generateSpec } from '../generate-spec/generate-spec';
import { readFileSync } from '@fileSystem';
import { getProviderDependencies } from '@angularDependencyExtractor';

/**
 * @param folderRightClickedPath /home/fernando/test/src/app
 */
export const generateDirective = async (folderRightClickedPath: string): Promise<void> => {
	const needPrefix = await promptBoolean({
		prompt: 'Do you want to prefix your directive selector?',
		options: ['Yes', 'No'],
	});

	const prefix = needPrefix ? await promptForPrefix() : null;
	const nameInCamelCase = await promptForName();

	await generateElement(
		path.join(folderRightClickedPath, `${camelCaseToKebabCase(nameInCamelCase)}.directive.ts`),
		TemplateFileNames.DIRECTIVE,
		getTemplateData(prefix, nameInCamelCase),
		generateDirectiveSpec,
	);
};

const promptForPrefix = async (): Promise<string | null> => {
	return await promptInput({
		prompt: 'Enter directive prefix (camel-case)',
		placeHolder: 'e.g. app',
		validationFn: value =>
			isCamelCase(value) ? null : 'Directive prefix must be in camel-case format',
		errorMessage: 'Error collecting directive prefix',
	});
};

const promptForName = async (): Promise<string> => {
	return await promptInput({
		prompt: 'Enter directive name (camel-case)',
		placeHolder: 'e.g. highlightOnHover',
		validationFn: value =>
			isCamelCase(value) ? null : 'Directive name must be in camel-case format',
		errorMessage: 'Error collecting directive name',
	});
};

const getTemplateData = (prefix: string | null, nameInCamelCase: string): DirectiveTemplateData => {
	const selector = prefix
		? `${prefix}${nameInCamelCase.charAt(0).toUpperCase() + nameInCamelCase.slice(1)}`
		: nameInCamelCase;

	return {
		className: `${nameInCamelCase.charAt(0).toUpperCase() + nameInCamelCase.slice(1)}Directive`,
		selector,
	};
};

const generateDirectiveSpec = async (directiveFilePath: string): Promise<void> => {
	await generateSpec(
		directiveFilePath.replace(/\.directive\.ts$/, '.directive.spec.ts'),
		TemplateFileNames.DIRECTIVE_SPEC,
		getSpecTemplateDate(directiveFilePath),
	);
};

const getSpecTemplateDate = (directiveFilePath: string): DirectiveSpecTemplateData => {
	const fileContent = readFileSync(directiveFilePath);

	return {
		className: filePathToClassName(directiveFilePath),
		directiveFileName: `${filePathToNameAsKebabCase(directiveFilePath)}.directive`,
		providers: getProviderDependencies(fileContent),
		selector: extractSelectorName(fileContent),
	};
};

const filePathToNameAsKebabCase = (filePath: string): string => {
	return (filePath.split('/').pop() || '').replace(/\.directive\.ts$/, '');
};

const extractSelectorName = (directiveContent: string): string => {
	const selectorRegex = /selector:\s*['"`]([^'"`]+)['"`]/;
	const match = directiveContent.match(selectorRegex);

	if (match && match[1]) {
		let selector = match[1];
		if (selector.startsWith('[') && selector.endsWith(']')) {
			selector = selector.substring(1, selector.length - 1);
		}
		return selector;
	}

	return '';
};

const filePathToClassName = (filePath: string): string => {
	return (
		filePathToNameAsKebabCase(filePath)
			.split('-')
			.map(part => part.charAt(0).toUpperCase() + part.slice(1))
			.join('') + 'Directive'
	);
};
