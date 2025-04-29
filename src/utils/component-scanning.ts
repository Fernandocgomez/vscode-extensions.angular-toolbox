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
		extractModuleClassesFromImportsArray(fileContent),
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
 * Scan the imports array and extract all module classes.
 * @param fileContent
 */
const extractModuleClassesFromImportsArray = (fileContent: string): Set<string> => {
	// Find the imports array
	const importsMatch = fileContent.match(/imports:\s*\[([\s\S]*?)\]/);

	if (!importsMatch) return new Set<string>();

	const importsContent = importsMatch[1];

	// Find all identifiers in the imports array
	const identifiers = importsContent
		.split(',')
		.map(item => item.trim())
		.filter(item => item.length > 0);

	// Use a Set to store unique class names
	const moduleClassesSet = new Set<string>();

	// Filter based on our criteria and add to Set
	identifiers.forEach(id => {
		// Match class names ending with "Module"
		if (/Module$/.test(id)) {
			moduleClassesSet.add(id);
		}
		// Include class names that DON'T end with "Pipe", "Directive", or "Component"
		else if (!/(Pipe|Directive|Component)$/.test(id)) {
			moduleClassesSet.add(id);
		}
	});

	return moduleClassesSet;
};
