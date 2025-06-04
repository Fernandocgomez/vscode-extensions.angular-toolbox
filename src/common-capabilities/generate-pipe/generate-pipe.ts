import { promptBoolean, promptInput } from '@extensionFramework';
import { PipeTemplateData, TemplateFileNames } from '@models';
import { camelCaseToKebabCase, isCamelCase } from '@utils';
import * as path from 'path';
import { generatePipeSpec } from '../generate-pipe-spec/generate-pipe-spec';
import { generateElement } from '../generate-element/generate-element';

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

	await generateElement(
		path.join(folderRightClickedPath, `${camelCaseToKebabCase(pipeNameInCamelCase)}.pipe.ts`),
		TemplateFileNames.PIPE,
		getPipeTemplateData(pipeSelectorPrefix, pipeNameInCamelCase),
		generatePipeSpec,
	);
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
	const selector = prefix
		? `${prefix}${pipeNameInCamelCase.charAt(0).toUpperCase() + pipeNameInCamelCase.slice(1)}`
		: pipeNameInCamelCase;

	return {
		className: `${pipeNameInCamelCase.charAt(0).toUpperCase() + pipeNameInCamelCase.slice(1)}Pipe`,
		selector,
	};
};
