import { promptBoolean, promptInput, showInformationMessage } from '@extensionFramework';
import { throwExceptionWhenFileExist, writeFileSync } from '@fileSystem';
import { PipeTemplateData, TemplateFileNames } from '@models';
import { getTemplatePath, renderTemplate } from '@templates';
import { camelCaseToKebabCase, isCamelCase } from '@utils';
import * as path from 'path';

/**
 * @param folderRightClickedPath /home/fernando/test/src/app
 */
export const generatePipe = async (folderRightClickedPath: string): Promise<void> => {
	const needSelectorPrefix = await promptBoolean({
		prompt: 'Do you want to prefix your pipe selector?',
		options: ['Yes', 'No'],
	});

	const pipeSelectorPrefix = needSelectorPrefix ? await promptForPrefix() : null;
	const pipeNameInCamelCase = await promptForPipeName();
	const pipeFilePath = path.join(
		folderRightClickedPath,
		`${camelCaseToKebabCase(pipeNameInCamelCase)}.pipe.ts`,
	);

	throwExceptionWhenFileExist(pipeFilePath);

	writeFileSync(
		pipeFilePath,
		renderTemplate(
			getTemplatePath(TemplateFileNames.PIPE),
			getPipeTemplateData(pipeSelectorPrefix, pipeNameInCamelCase),
		),
	);

	showInformationMessage('Pipe was generated successfully.');

	// There is a bug when creating a pipe.
	// We are getting the error "Default template does not exist."
};

const promptForPrefix = async (): Promise<string | null> => {
	return await promptInput({
		prompt: 'Enter pipe prefix (camel-case)',
		placeHolder: 'e.g. appDashboard',
		validationFn: value => (isCamelCase(value) ? null : 'Pipe prefix must be in camel-case format'),
		errorMessage: 'Error collecting pipe prefix',
	});
};

const promptForPipeName = async (): Promise<string> => {
	return await promptInput({
		prompt: 'Enter pipe name (camel-case)',
		placeHolder: 'e.g. simpleFormat',
		validationFn: value => (isCamelCase(value) ? null : 'Pipe name must be in camel-case format'),
		errorMessage: 'Error collecting pipe name',
	});
};

const getPipeTemplateData = (
	prefix: string | null,
	pipeNameInCamelCase: string,
): PipeTemplateData => {
	const selector = prefix ? `${prefix}${pipeNameInCamelCase}` : pipeNameInCamelCase;
	const pipeNameAsKebabCase = camelCaseToKebabCase(pipeNameInCamelCase);

	return {
		className: `${pipeNameInCamelCase}Pipe`,
		pipeNameAsKebabCase,
		selector,
	};
};
