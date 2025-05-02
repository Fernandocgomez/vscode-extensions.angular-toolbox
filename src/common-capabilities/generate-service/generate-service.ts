import {
	openTextFile,
	promptBoolean,
	promptInput,
	showErrorMessage,
	showInformationMessage,
} from '@extensionFramework';
import { isKebabCase, kebabCaseToPascal } from '@utils';
import * as path from 'path';
import { getTemplatePath, renderTemplate } from '@templates';
import { ServiceTemplateData, TemplateFileNames } from '@models';
import { generateServiceSpec } from '../generate-service-spec/generate-service-spec';
import { throwExceptionWhenFileExist, writeFileSync } from '@fileSystem';

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

	try {
		const serviceName = await askForServiceName();
		const serviceFilePath = path.join(folderRightClickedPath, `${serviceName}.service.ts`);
		const serviceTemplateData: ServiceTemplateData = {
			isGlobal: isServiceGlobal,
			className: isHttpService
				? `${kebabCaseToPascal(serviceName)}Service`
				: kebabCaseToPascal(serviceName),
		};

		throwExceptionWhenFileExist(serviceFilePath);

		writeFileSync(
			serviceFilePath,
			renderTemplate(
				getTemplatePath(isHttpService ? TemplateFileNames.HTTP_SERVICE : TemplateFileNames.SERVICE),
				serviceTemplateData,
			),
		);

		showInformationMessage('Service was generated successfully.');

		const shouldGenerateSpecFile = await promptBoolean({
			prompt: 'Do you want to generate the spec file?',
			options: ['Yes', 'No'],
		});

		if (shouldGenerateSpecFile) {
			await generateServiceSpec(serviceFilePath);
		}

		await openTextFile(serviceFilePath);
	} catch (error: any) {
		showErrorMessage(error.message);
	}
};

const askForServiceName = async (): Promise<string> => {
	const nameInKebabCase = await promptInput({
		prompt: 'Enter service name (kebab-case)',
		placeHolder: 'e.g. user-auth',
		validationFn: value =>
			isKebabCase(value) ? null : 'Service name must be in kebab-case format',
	});

	if (!nameInKebabCase) {
		throw new Error('Error collecting service name');
	}

	return nameInKebabCase;
};
