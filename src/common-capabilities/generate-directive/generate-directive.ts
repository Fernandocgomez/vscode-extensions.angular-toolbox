import { promptBoolean, promptInput } from '@extensionFramework';
import { camelCaseToKebabCase, isCamelCase } from '@utils';
import { generateElement } from '../generate-element/generate-element';
import * as path from 'path';
import { DirectiveSpecTemplateData, DirectiveTemplateData, TemplateFileNames } from '@models';
import { generateSpec } from '../generate-spec/generate-spec';

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
		getTemplateData(),
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

const getTemplateData = (): DirectiveTemplateData => {
	return {
		className: 'HighlightContentOnHoverDirective',
		selector: 'app-highlight-content-on-hover',
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
	return {
		className: 'HighlightContentOnHoverDirective',
		directiveFileName: '',
		providers: [],
	};
};
