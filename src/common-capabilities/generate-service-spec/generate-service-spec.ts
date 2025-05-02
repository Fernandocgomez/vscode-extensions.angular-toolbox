import { getServiceDependenciesBeingInjected } from '@angularDependencyExtractor';
import { showInformationMessage } from '@extensionFramework';
import { readFileSync, throwExceptionWhenFileExist, writeFileSync } from '@fileSystem';
import { ServiceSpecTemplateData, TemplateFileNames } from '@models';
import { getTemplatePath, renderTemplate } from '@templates';

/**
 * @param serviceFilePath /home/fernando/test/src/app/user-auth.service.ts
 */
export const generateServiceSpec = async (serviceFilePath: string): Promise<void> => {
	try {
		const serviceSpecFilePath = serviceFilePath.replace(/\.service\.ts$/, '.service.spec.ts');

		throwExceptionWhenFileExist(serviceSpecFilePath);

		const serviceFileContent = readFileSync(serviceFilePath);
		const serviceDependencies = getServiceDependenciesBeingInjected(serviceFileContent);
		const isHttpService = serviceDependencies.some(
			dependency => dependency.className === 'HttpClient',
		);

		const templateData: ServiceSpecTemplateData = {
			className: extractServiceClassName(serviceFileContent),
			serviceFileName: extractFilename(serviceFilePath),
			providers: serviceDependencies,
		};

		writeFileSync(
			serviceSpecFilePath,
			renderTemplate(
				getTemplatePath(
					isHttpService ? TemplateFileNames.HTTP_SERVICE_SPEC : TemplateFileNames.SERVICE_SPEC,
				),
				templateData,
			),
		);

		showInformationMessage('Spec was generated successfully.');
	} catch (error: any) {
		showInformationMessage(error.message);
	}
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
