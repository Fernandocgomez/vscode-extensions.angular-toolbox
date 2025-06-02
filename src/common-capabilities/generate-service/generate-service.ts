import { promptBoolean, promptInput } from '@extensionFramework';
import { isKebabCase, kebabCaseToPascal } from '@utils';
import * as path from 'path';
import { ServiceTemplateData, TemplateFileNames } from '@models';
import { generateServiceSpec } from '../generate-service-spec/generate-service-spec';
import { generateElement } from '../generate-element/generate-element';

/**
 * @param folderRightClickedPath /home/fernando/test/src/app
 */
export const generateService = async (folderRightClickedPath: string): Promise<void> => {
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
