import { toCamelCase, toPascalCase, toKebabCase } from '@utils';
import { generateAngularElement, generateSpec, promptForName } from './util';
import {
	RouteGuardSpecTemplateData,
	RouteGuardTemplateData,
	TemplateFileNames,
} from '@models';
import * as path from 'path';
import { AngularElement } from './models';

/**
 * @param folderRightClickedPath /home/fernando/test/src/app
 */
export const generateRouteGuard = async (folderRightClickedPath: string) => {
	const nameInKebabCase = toKebabCase(
		await promptForName(AngularElement.GUARD, 'user-auth'),
	);
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
