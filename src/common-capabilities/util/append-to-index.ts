import { getExtensionJsonBaseConfigService } from '@extensionConfig';
import { existsSync, readFileSync, writeFileSync } from '@fileSystem';
import * as path from 'path';

/**
 * appends the generate file to the index.ts file in the directory where the element was generated.
 * @param folderRightClickedPath '/home/fernando/test/src/app'
 * @param fileName 'user-profile.component.ts'
 */
export const appendToIndex = (
	folderRightClickedPath: string,
	fileName: string,
): void => {
	if (!getExtensionJsonBaseConfigService().addToIndex()) {
		return;
	}

	const indexPath = path.join(folderRightClickedPath, 'index.ts');
	const exportStatement = `export * from './${fileName}';\n`;

	if (existsSync(indexPath)) {
		const currentContent = readFileSync(indexPath);
		const contentToWrite = currentContent.endsWith('\n')
			? currentContent
			: currentContent + '\n';

		writeFileSync(indexPath, contentToWrite + exportStatement);
	} else {
		writeFileSync(indexPath, exportStatement);
	}
};
