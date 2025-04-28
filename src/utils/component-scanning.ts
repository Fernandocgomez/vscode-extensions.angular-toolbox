import { Dependency } from '@models';

export const getComponentProviderDependencies = (
	fileContent: string,
): Dependency[] => {
	const dependencyClassNames = new Set<string>();
	const importMap: Record<string, string> = {};

	// Parse import statements to build a map of className -> importPath
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

	// Map class names to their dependencies
	const dependencies: Dependency[] = Array.from(dependencyClassNames).map(
		className => ({
			className,
			importPath: importMap[className] || 'unknown',
		}),
	);

	return dependencies;
};
