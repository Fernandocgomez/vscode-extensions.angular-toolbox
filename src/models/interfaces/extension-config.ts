import { StylesheetsFormat } from '../types';

export interface ExtensionConfig {
	skipPrefix?: boolean;
	skipSpec?: boolean;
	addToIndex?: boolean;
	component?: {
		inlineTemplate?: boolean;
		inlineStyle?: boolean;
		withOnPushChangeDetection?: boolean;
		stylesheetsFormat?: StylesheetsFormat;
		generateStory?: boolean;
	};
}

export interface SafeExtensionConfig {
	skipPrefix: boolean;
	skipSpec: boolean;
	addToIndex: boolean;
	component: {
		inlineTemplate: boolean;
		inlineStyle: boolean;
		withOnPushChangeDetection: boolean;
		stylesheetsFormat: StylesheetsFormat;
		generateStory: boolean;
	};
}
