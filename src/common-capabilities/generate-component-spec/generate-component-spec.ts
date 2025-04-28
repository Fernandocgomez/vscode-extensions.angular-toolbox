import * as path from 'path';
import * as fs from 'fs';
import { Dependency } from '@models';

/**
 *
 * @param componentFilePath /home/fernando/test/src/app/my-component.component.ts
 */
export const generateComponentSpec = async (
	componentFilePath: string,
): Promise<void> => {
	// if (!fs.existsSync(filePath)) {
	// 	return [];
	// }
	// const fileContent = fs.readFileSync(filePath, 'utf-8');
};
