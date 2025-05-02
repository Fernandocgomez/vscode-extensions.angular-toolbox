import { Dependency } from '@models';
import {
	combineImportStatementsWithClassnames,
	getAllClassNamesBeingInjected,
	getAllImportStatements,
} from './shared';

export const getServiceDependenciesBeingInjected = (fileContent: string): Dependency[] => {
	return combineImportStatementsWithClassnames(
		getAllImportStatements(fileContent),
		getAllClassNamesBeingInjected(fileContent),
	);
};
