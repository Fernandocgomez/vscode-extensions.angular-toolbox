import { Dependency } from '@models';
import {
	combineImportStatementsWithClassnames,
	getAllClassNamesBeingInjected,
	getAllImportStatements,
} from './shared';

export const getComponentProviderDependencies = (fileContent: string): Dependency[] => {
	return combineImportStatementsWithClassnames(
		getAllImportStatements(fileContent),
		getAllClassNamesBeingInjected(fileContent),
	);
};

export const getComponentModuleDependencies = (fileContent: string): Dependency[] => {
	return combineImportStatementsWithClassnames(
		getAllImportStatements(fileContent),
		extractClassesFromImportsArray(
			fileContent,
			(className: string) =>
				/Module$/.test(className) || !/(Pipe|Directive|Component)$/.test(className),
		),
	);
};

export const getComponentStandaloneComponentDependencies = (fileContent: string): Dependency[] => {
	return combineImportStatementsWithClassnames(
		getAllImportStatements(fileContent),
		extractClassesFromImportsArray(fileContent, (className: string) =>
			/Component$/.test(className),
		),
	);
};

export const getComponentPipesDependencies = (fileContent: string): Dependency[] => {
	return combineImportStatementsWithClassnames(
		getAllImportStatements(fileContent),
		extractClassesFromImportsArray(fileContent, className => /Pipe$/.test(className)),
	);
};

export const getComponentDirectivesDependencies = (fileContent: string): Dependency[] => {
	return combineImportStatementsWithClassnames(
		getAllImportStatements(fileContent),
		extractClassesFromImportsArray(fileContent, className => /Directive$/.test(className)),
	);
};
/**
 * Scan the imports array and extract the class names base on the classNameFilteringFn.
 * @param fileContent
 * @param classNameFilteringFn - callback to filter class names grab from the imports array.
 */
const extractClassesFromImportsArray = (
	fileContent: string,
	classNameFilteringFn: (className: string) => boolean,
): Set<string> => {
	const importsMatch = fileContent.match(/imports:\s*\[([\s\S]*?)\]/);

	if (!importsMatch || importsMatch.length < 1) {
		return new Set<string>();
	}

	return new Set(
		importsMatch[1]
			.split(',')
			.map(item => item.trim())
			.filter(item => item.length > 0)
			.filter(classNameFilteringFn),
	);
};
