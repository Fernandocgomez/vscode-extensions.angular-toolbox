import { promptBoolean } from '@extensionFramework';
import { toKebabCase, toPascalCase } from '@utils';
import * as path from 'path';
import {
	ServiceSpecTemplateData,
	ServiceTemplateData,
	TemplateFileNames,
} from '@models';
import { generateAngularElement, generateSpec, promptForName } from './util';
import { readFileSync } from '@fileSystem';
import { getServiceDependenciesBeingInjected } from '@angularDependencyExtractor';
import { AngularElement } from './models';

/**
 * @param folderRightClickedPath /home/fernando/test/src/app
 */
export const generateService = async (
	folderRightClickedPath: string,
): Promise<void> => {
	const isServiceGlobal = await promptBoolean({
		prompt: 'Is this service global?',
		options: ['Yes', 'No'],
	});

	const isHttpService = await promptBoolean({
		prompt: 'Is this service an HTTP one?',
		options: ['Yes', 'No'],
	});

	const serviceName = toKebabCase(
		await promptForName(AngularElement.SERVICE, 'user-auth'),
	);

	const serviceTemplateData: ServiceTemplateData = {
		isGlobal: isServiceGlobal,
		className: isHttpService
			? `${toPascalCase(serviceName)}Service`
			: toPascalCase(serviceName),
	};

	await generateAngularElement(
		path.join(folderRightClickedPath, `${serviceName}.service.ts`),
		isHttpService ? TemplateFileNames.HTTP_SERVICE : TemplateFileNames.SERVICE,
		serviceTemplateData,
		generateServiceSpec,
	);
};

/**
 * @param serviceFilePath /home/fernando/test/src/app/user-auth.service.ts
 */
export const generateServiceSpec = async (
	serviceFilePath: string,
): Promise<void> => {
	const { templateData, templateName } =
		getTemplateNameAndTemplateData(serviceFilePath);

	await generateSpec(
		serviceFilePath.replace(/\.service\.ts$/, '.service.spec.ts'),
		templateName,
		templateData,
	);
};

const extractServiceClassName = (serviceFileContent: string): string => {
	const match = serviceFileContent.match(/export\s+class\s+(\w+)/);

	if (!match) {
		throw new Error('Unable to extract the service class name');
	}

	return match[1];
};

const extractFilename = (serviceFilePath: string): string => {
	return (serviceFilePath.split('/').pop() || '').replace(
		/\.service\.ts$/,
		'.service',
	);
};

const getTemplateNameAndTemplateData = (
	serviceFilePath: string,
): { templateName: string; templateData: ServiceSpecTemplateData } => {
	const serviceFileContent = readFileSync(serviceFilePath);
	const serviceDependencies =
		getServiceDependenciesBeingInjected(serviceFileContent);

	return {
		templateName: serviceDependencies.some(
			dependency => dependency.className === 'HttpClient',
		)
			? TemplateFileNames.HTTP_SERVICE_SPEC
			: TemplateFileNames.SERVICE_SPEC,
		templateData: {
			className: extractServiceClassName(serviceFileContent),
			serviceFileName: extractFilename(serviceFilePath),
			providers: serviceDependencies,
		},
	};
};
