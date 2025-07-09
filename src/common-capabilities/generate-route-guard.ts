import { promptInput } from '@extensionFramework';
import { isKebabCase, toCamelCase, toPascalCase } from '@utils';
import { generateAngularElement, generateSpec } from './util';
import {
	RouteGuardSpecTemplateData,
	RouteGuardTemplateData,
	TemplateFileNames,
} from '@models';
import * as path from 'path';

/**
 * @param folderRightClickedPath /home/fernando/test/src/app
 */
export const generateRouteGuard = async (folderRightClickedPath: string) => {
	const nameInKebabCase = await promptForName();
	const templateData: RouteGuardTemplateData = {
		className: `${toPascalCase(nameInKebabCase)}Guard`,
		fnName: `${toCamelCase(nameInKebabCase)}Guard`,
	};

	await generateAngularElement(
		path.join(folderRightClickedPath, `${nameInKebabCase}.guard.ts`),
		TemplateFileNames.GUARD,
		templateData,
		generateRouteGuardSpec,
	);
};

const promptForName = async (): Promise<string> => {
	return await promptInput({
		prompt: 'Enter route guard name (kebab-case)',
		placeHolder: 'e.g. user-auth',
		validationFn: value =>
			isKebabCase(value)
				? null
				: 'Route guard name must be in kebab-case format',
	});
};

export const generateRouteGuardSpec = async (
	routeGuardFilePath: string,
): Promise<void> => {
	const nameInKebabCase = path.basename(routeGuardFilePath, '.guard.ts');
	const templateData: RouteGuardSpecTemplateData = {
		className: `${toPascalCase(nameInKebabCase)}Guard`,
		fnName: `${toCamelCase(nameInKebabCase)}Guard`,
		nameInKebabCase,
	};

	await generateSpec(
		routeGuardFilePath.replace(/\.guard\.ts$/, '.guard.spec.ts'),
		TemplateFileNames.GUARD_SPEC,
		templateData,
	);
};
