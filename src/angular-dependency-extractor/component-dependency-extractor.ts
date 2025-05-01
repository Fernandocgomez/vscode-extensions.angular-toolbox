import { Dependency } from '@models';

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

const combineImportStatementsWithClassnames = (
	importStatements: Record<string, string>,
	classNames: Set<string>,
): Dependency[] => {
	return Array.from(classNames).map<Dependency>(className => ({
		className,
		importPath: importStatements[className] || 'unknown',
	}));
};

/**
 * Parse import statements to build a map of className -> importPath
 * @param fileContent
 */
const getAllImportStatements = (fileContent: string): Record<string, string> => {
	const importMap: Record<string, string> = {};

	const importRegex = /import\s*{([^}]+)}\s*from\s*['"]([^'"]+)['"]/g;
	let importMatch;

	while ((importMatch = importRegex.exec(fileContent)) !== null) {
		if (importMatch[1] && importMatch[2]) {
			const classNames = importMatch[1].split(',').map(name => name.trim());
			const importPath = importMatch[2].trim();

			classNames.forEach(className => {
				importMap[className] = importPath;
			});
		}
	}

	return importMap;
};

/**
 * Scan the inside of the class to located any class that is being injected using constructor DI or the inject function.
 * @param fileContent
 */
const getAllClassNamesBeingInjected = (fileContent: string): Set<string> => {
	const dependencyClassNames = new Set<string>();

	// Find inject() calls
	const injectRegex = /inject\(([^)]+)\)/g;
	let injectMatch;

	while ((injectMatch = injectRegex.exec(fileContent)) !== null) {
		if (injectMatch[1]) {
			dependencyClassNames.add(injectMatch[1].trim());
		}
	}

	// Find constructor parameters
	const constructorParamRegex = /constructor\s*\(([^)]+)\)/;
	const constructorMatch = constructorParamRegex.exec(fileContent);

	if (constructorMatch && constructorMatch[1]) {
		const constructorParams = constructorMatch[1].split(',');

		constructorParams.forEach(param => {
			// Extract the type after the colon
			const typeMatch = param.match(/:\s*([^,\s]+)/);
			if (typeMatch && typeMatch[1]) {
				dependencyClassNames.add(typeMatch[1].trim());
			}
		});
	}

	return dependencyClassNames;
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
