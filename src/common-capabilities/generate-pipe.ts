import { promptBoolean, promptInput } from '@extensionFramework';
import {
	PipeSpecTemplateData,
	PipeTemplateData,
	TemplateFileNames,
} from '@models';
import { camelCaseToKebabCase, isCamelCase } from '@utils';
import * as path from 'path';
import { generateElement, generateSpec } from './util';
import { readFileSync } from '@fileSystem';
import { getProviderDependencies } from '@angularDependencyExtractor';
import { getExtensionConfigService } from '@extensionConfig';

/**
 * @param folderRightClickedPath /home/fernando/test/src/app
 */
export const generatePipe = async (
	folderRightClickedPath: string,
): Promise<void> => {
	const needSelectorPrefix = await promptBoolean({
		prompt: 'Do you want to prefix your pipe selector?',
		options: ['Yes', 'No'],
	});

	const pipeSelectorPrefix = needSelectorPrefix
		? await promptForPrefix()
		: null;
	const pipeNameInCamelCase = await promptForPipeName();

	await generateElement(
		path.join(
			folderRightClickedPath,
			`${camelCaseToKebabCase(pipeNameInCamelCase)}.pipe.ts`,
		),
		TemplateFileNames.PIPE,
		getPipeTemplateData(pipeSelectorPrefix, pipeNameInCamelCase),
		generatePipeSpec,
		getExtensionConfigService().skipPipeSpec(),
	);
};

const promptForPrefix = async (): Promise<string | null> => {
	return await promptInput({
		prompt: 'Enter pipe prefix (camel-case)',
		placeHolder: 'e.g. appDashboard',
		validationFn: value =>
			isCamelCase(value) ? null : 'Pipe prefix must be in camel-case format',
		errorMessage: 'Error collecting pipe prefix',
	});
};

const promptForPipeName = async (): Promise<string> => {
	return await promptInput({
		prompt: 'Enter pipe name (camel-case)',
		placeHolder: 'e.g. simpleFormat',
		validationFn: value =>
			isCamelCase(value) ? null : 'Pipe name must be in camel-case format',
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

/**
 * Generates a .spec.ts file for an Angular pipe.
 * @param pipeFilePath Absolute path to the pipe file (e.g., /path/to/my-pipe.pipe.ts)
 */
export const generatePipeSpec = async (pipeFilePath: string): Promise<void> => {
	await generateSpec(
		pipeFilePath.replace(/\.pipe\.ts$/, '.pipe.spec.ts'),
		TemplateFileNames.PIPE_SPEC,
		getSpecTemplateDate(pipeFilePath),
	);
};

/**
 * Convert from /home/fernando/test/src/app/my-cool.pipe.ts to MyCoolPipe
 * @param filePath
 */
const filePathToClassName = (filePath: string): string => {
	return (
		filePathToPipeNameAsKebabCase(filePath)
			.split('-')
			.map(part => part.charAt(0).toUpperCase() + part.slice(1))
			.join('') + 'Pipe'
	);
};

const filePathToPipeNameAsKebabCase = (filePath: string): string => {
	return (filePath.split('/').pop() || '').replace(/\.pipe\.ts$/, '');
};

export const getSpecTemplateDate = (
	pipeFilePath: string,
): PipeSpecTemplateData => {
	const fileContent = readFileSync(pipeFilePath);

	return {
		className: filePathToClassName(pipeFilePath),
		pipeNameAsKebabCase: filePathToPipeNameAsKebabCase(pipeFilePath),
		providers: getProviderDependencies(fileContent),
	};
};
