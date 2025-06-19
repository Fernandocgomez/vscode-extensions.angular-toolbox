import { openTextFile, showErrorMessage } from '@extensionFramework';
import { generateComponentSpec } from './generate-component';
import { generateDirectiveSpec } from './generate-directive';
import { generatePipeSpec } from './generate-pipe';
import { generateServiceSpec } from './generate-service';
import * as path from 'path';

/**
 * @param fileRightClickedPath /home/fernando/test/src/app/user-profile.component.ts
 */
export const generateSpec = async (fileRightClickedPath: string) => {
	const fileName = path.basename(fileRightClickedPath);
	const typeExtractionRegex = /\.([^.]+)\.ts$/;
	const match = fileName.match(typeExtractionRegex);

	let angularFileType: string;

	if (match && match[1]) {
		angularFileType = match[1];
	} else {
		showErrorMessage(
			'Make sure your file does follow the Angular style guidelines.',
		);

		return;
	}

	switch (angularFileType) {
		case 'component':
			await generateComponentSpec(fileRightClickedPath);

			await openTextFile(
				fileRightClickedPath.replace(/\.component\.ts$/, '.component.spec.ts'),
			);
			break;

		case 'pipe':
			await generatePipeSpec(fileRightClickedPath);

			await openTextFile(
				fileRightClickedPath.replace(/\.pipe\.ts$/, '.pipe.spec.ts'),
			);
			break;

		case 'directive':
			await generateDirectiveSpec(fileRightClickedPath);

			await openTextFile(
				fileRightClickedPath.replace(/\.directive\.ts$/, '.directive.spec.ts'),
			);
			break;

		case 'service':
			await generateServiceSpec(fileRightClickedPath);

			await openTextFile(
				fileRightClickedPath.replace(/\.service\.ts$/, '.service.spec.ts'),
			);
			break;

		// case 'guard':
		// 	break;

		// case 'interceptor':
		// 	break;

		// case 'resolver':
		// 	break;

		default:
			showErrorMessage(
				`[generateSpec] Unsupported file type for spec generation: ${angularFileType} (from file: ${fileName})`,
			);
			break;
	}
};
