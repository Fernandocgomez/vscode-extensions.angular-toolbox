import { getServiceDependenciesBeingInjected } from '@angularDependencyExtractor';
import { readFileSync } from '@fileSystem';
import { ServiceSpecTemplateData, TemplateFileNames } from '@models';
import { generateSpec } from '../generate-spec/generate-spec';

/**
 * @param serviceFilePath /home/fernando/test/src/app/user-auth.service.ts
 */
export const generateServiceSpec = async (serviceFilePath: string): Promise<void> => {
	const { templateData, templateName } = getTemplateNameAndTemplateData(serviceFilePath);

	generateSpec(
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
	return (serviceFilePath.split('/').pop() || '').replace(/\.service\.ts$/, '.service');
};

const getTemplateNameAndTemplateData = (
	serviceFilePath: string,
): { templateName: string; templateData: ServiceSpecTemplateData } => {
	const serviceFileContent = readFileSync(serviceFilePath);
	const serviceDependencies = getServiceDependenciesBeingInjected(serviceFileContent);

	return {
		templateName: serviceDependencies.some(dependency => dependency.className === 'HttpClient')
			? TemplateFileNames.HTTP_SERVICE_SPEC
			: TemplateFileNames.SERVICE_SPEC,
		templateData: {
			className: extractServiceClassName(serviceFileContent),
			serviceFileName: extractFilename(serviceFilePath),
			providers: serviceDependencies,
		},
	};
};
