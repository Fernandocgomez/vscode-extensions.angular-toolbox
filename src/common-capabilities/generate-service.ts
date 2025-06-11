import { promptBoolean, promptInput } from '@extensionFramework';
import { isKebabCase, kebabCaseToPascal } from '@utils';
import * as path from 'path';
import {
	ServiceSpecTemplateData,
	ServiceTemplateData,
	TemplateFileNames,
} from '@models';
import { generateElement, generateSpec } from './util';
import { readFileSync } from '@fileSystem';
import { getServiceDependenciesBeingInjected } from '@angularDependencyExtractor';

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

	const serviceName = await askForServiceName();
	const serviceTemplateData: ServiceTemplateData = {
		isGlobal: isServiceGlobal,
		className: isHttpService
			? `${kebabCaseToPascal(serviceName)}Service`
			: kebabCaseToPascal(serviceName),
	};

	await generateElement(
		path.join(folderRightClickedPath, `${serviceName}.service.ts`),
		isHttpService ? TemplateFileNames.HTTP_SERVICE : TemplateFileNames.SERVICE,
		serviceTemplateData,
		generateServiceSpec,
	);
};

const askForServiceName = async (): Promise<string> => {
	return await promptInput({
		prompt: 'Enter service name (kebab-case)',
		placeHolder: 'e.g. user-auth',
		validationFn: value =>
			isKebabCase(value) ? null : 'Service name must be in kebab-case format',
		errorMessage: 'Error collecting service name',
	});
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
