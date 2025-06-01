import { TemplateFileNames, PipeSpecTemplateData } from '@models';
import { getTemplatePath, renderTemplate } from '@templates';
import { showInformationMessage } from '@extensionFramework';
import { throwExceptionWhenFileExist, writeFileSync } from '@fileSystem';
import { getProviderDependencies } from '@angularDependencyExtractor';

/**
 * Generates a .spec.ts file for an Angular pipe.
 * @param pipeFilePath Absolute path to the pipe file (e.g., /path/to/my-pipe.pipe.ts)
 */
export const generatePipeSpec = async (pipeFilePath: string): Promise<void> => {
	const pipeSpecFilePath = pipeFilePath.replace(/\.pipe\.ts$/, '.pipe.spec.ts');

	throwExceptionWhenFileExist(pipeSpecFilePath);

	writeFileSync(
		pipeSpecFilePath,
		renderTemplate(getTemplatePath(TemplateFileNames.PIPE_SPEC), getSpecTemplateDate(pipeFilePath)),
	);

	showInformationMessage('Pipe spec was generated successfully.');
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

export const getSpecTemplateDate = (pipeFilePath: string): PipeSpecTemplateData => {
	return {
		className: filePathToClassName(pipeFilePath),
		pipeNameAsKebabCase: filePathToPipeNameAsKebabCase(pipeFilePath),
		providers: getProviderDependencies(pipeFilePath),
	};
};
