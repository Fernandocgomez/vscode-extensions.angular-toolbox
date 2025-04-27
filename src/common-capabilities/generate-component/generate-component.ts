import { promptInput } from '@extensionFramework';

// fsPath === '/home/fernando/test/src/app'
export const generateComponent = async (fsPath: string) => {
	// Ask for prefix
	const componentSelectorPrefix = await promptInput({
		prompt: 'Enter component name (kebab-case)',
		placeHolder: 'e.g. user-profile',
		validationFn: value => {
			// Validate kebab-case format
			return /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(value)
				? null
				: 'Component name must be in kebab-case format';
		},
		errorMessage: 'Error collecting component name',
	});

	console.log(componentSelectorPrefix);
};
