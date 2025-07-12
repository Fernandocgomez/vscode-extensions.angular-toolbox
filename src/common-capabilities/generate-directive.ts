import { isCamelCase, toCamelCase, toKebabCase } from '@utils';
import { generateAngularElement, generateSpec, promptForName } from './util';
import * as path from 'path';
import {
	DirectiveSpecTemplateData,
	DirectiveTemplateData,
	TemplateFileNames,
} from '@models';
import { readFileSync } from '@fileSystem';
import { getProviderDependencies } from '@angularDependencyExtractor';
import { promptForPrefix } from './util/prompt-for-prefix';
import { AngularElement } from './models';

/**
 * @param folderRightClickedPath /home/fernando/test/src/app
 */
export const generateDirective = async (
	folderRightClickedPath: string,
): Promise<void> => {
	const prefix = await promptForPrefix(value =>
		isCamelCase(value) ? null : 'Directive prefix must be in camel-case format',
	);
	const nameInCamelCase = toCamelCase(
		await promptForName(AngularElement.DIRECTIVE, 'highlight-on-hover'),
	);

	await generateAngularElement(
		path.join(
			folderRightClickedPath,
			`${toKebabCase(nameInCamelCase)}.directive.ts`,
		),
		TemplateFileNames.DIRECTIVE,
		getTemplateData(prefix, nameInCamelCase),
		generateDirectiveSpec,
	);
};

const getTemplateData = (
	prefix: string | null,
	nameInCamelCase: string,
): DirectiveTemplateData => {
	const selector = prefix
		? `${toCamelCase(prefix)}${nameInCamelCase.charAt(0).toUpperCase() + nameInCamelCase.slice(1)}`
		: nameInCamelCase;

	return {
		className: `${nameInCamelCase.charAt(0).toUpperCase() + nameInCamelCase.slice(1)}Directive`,
		selector,
	};
};

export const generateDirectiveSpec = async (
	directiveFilePath: string,
): Promise<void> => {
	await generateSpec(
		directiveFilePath.replace(/\.directive\.ts$/, '.directive.spec.ts'),
		TemplateFileNames.DIRECTIVE_SPEC,
		getSpecTemplateDate(directiveFilePath),
	);
};

const getSpecTemplateDate = (
	directiveFilePath: string,
): DirectiveSpecTemplateData => {
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
