import { promptInput } from '@extensionFramework';
import { isCamelKebabPascalCase } from '@utils';
import { AngularElement, TypeScriptElement } from '../models';

export const promptForName = async (
	elementName: AngularElement | TypeScriptElement,
	placeHolder: string,
): Promise<string> => {
	return await promptInput({
		prompt: `Enter ${elementName} name (kebab-case, camel-case or pascal-case)`,
		placeHolder: `e.g. ${placeHolder}`,
		validationFn: value =>
			isCamelKebabPascalCase(value)
				? null
				: `${elementName.toUpperCase()} name must be in kebab-case, camel-case, or pascal-case`,
	});
};
