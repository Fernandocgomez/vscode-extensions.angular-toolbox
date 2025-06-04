import { TemplateFileNames, PipeSpecTemplateData } from '@models';
import { readFileSync } from '@fileSystem';
import { getProviderDependencies } from '@angularDependencyExtractor';
import { generateSpec } from '../generate-spec/generate-spec';

/**
 * Generates a .spec.ts file for an Angular pipe.
 * @param pipeFilePath Absolute path to the pipe file (e.g., /path/to/my-pipe.pipe.ts)
 */
export const generatePipeSpec = async (pipeFilePath: string): Promise<void> => {
	generateSpec(
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

export const getSpecTemplateDate = (pipeFilePath: string): PipeSpecTemplateData => {
	const fileContent = readFileSync(pipeFilePath);

	return {
		className: filePathToClassName(pipeFilePath),
		pipeNameAsKebabCase: filePathToPipeNameAsKebabCase(pipeFilePath),
		providers: getProviderDependencies(fileContent),
	};
};
