import {
	openTextFile,
	promptBoolean,
	promptInput,
	showErrorMessage,
	showInformationMessage,
} from '@extensionFramework';
import { isKebabCase, kebabCaseToPascal } from '@utils';
import * as path from 'path';
import * as fs from 'fs';
import { getTemplate, renderTemplate } from '@templates';
import { ServiceTemplateData, TemplateFileNames } from '@models';

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

		fs.writeFileSync(
			serviceFilePath,
			renderTemplate(
				getTemplate(isHttpService ? TemplateFileNames.HTTP_SERVICE : TemplateFileNames.SERVICE),
				serviceTemplateData,
			),
		);

		showInformationMessage('Service was generated successfully.');

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
