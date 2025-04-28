import * as path from 'path';
import * as fs from 'fs';

interface Dependency {
	className: string;
	importPath: string;
}

interface ComponentSpecTemplateData {
	className: string;
	componentNameAsKebabCase: string;
	providers: Dependency[];
	modules: Dependency[];
	components: Dependency[];
	pipes: Dependency[];
	directives: Dependency[];
}

const getComponentProviderDependencies = (filePath: string): Dependency[] => {
	if (!fs.existsSync(filePath)) {
		return [];
	}

	const fileContent = fs.readFileSync(filePath, 'utf-8');

	let dependencies: Dependency[] = [];

	// Extract provider array from @Component decorator
	const componentDecoratorRegex =
		/@Component\(\s*\{\s*(?:[^{}]*|\{[^{}]*\})*providers\s*:\s*\[([\s\S]*?)\]/;
	const providersMatch = fileContent.match(componentDecoratorRegex);

	if (providersMatch && providersMatch[1]) {
		const providersArray = providersMatch[1].trim();

		// Extract class names from providers array
		const classNamesRegex = /\b([A-Z]\w+)\b/g;
		const providerClassNames = Array.from(
			providersArray.matchAll(classNamesRegex),
		).map(match => match[1]);

		// Find import paths and create dependencies
		const providerDependencies = providerClassNames
			.map(className => {
				const importPath = findImportPath(fileContent, className);
				return importPath ? { className, importPath } : null;
			})
			.filter((dep): dep is Dependency => dep !== null);

		dependencies = [...dependencies, ...providerDependencies];
	}

	return [];
};

const findImportPath = (
	fileContent: string,
	className: string,
): string | null => {
	const importRegex = new RegExp(
		`import\\s*{[^}]*\\b${className}\\b[^}]*}\\s*from\\s*['"]([^'"]+)['"]`,
		'g',
	);
	const importMatches = Array.from(fileContent.matchAll(importRegex));

	if (importMatches.length > 0) {
		return importMatches[0][1];
	}

	// Check for default imports
	const defaultImportRegex = new RegExp(
		`import\\s+${className}\\s+from\\s*['"]([^'"]+)['"]`,
		'g',
	);
	const defaultMatches = Array.from(fileContent.matchAll(defaultImportRegex));

	return defaultMatches.length > 0 ? defaultMatches[0][1] : null;
};

/**
 *
 * @param componentFilePath /home/fernando/test/src/app/my-component.component.ts
 */
export const generateComponentSpec = async (
	componentFilePath: string,
): Promise<void> => {};
