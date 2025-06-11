import { StylesheetsFormat } from '../types';

export interface ExtensionConfig {
	skipPrefix?: boolean;
	skipSpec?: boolean;
	component?: {
		skipSpec?: boolean;
		inlineTemplate?: boolean;
		inlineStyle?: boolean;
		withOnPushChangeDetection?: boolean;
		stylesheetsFormat?: StylesheetsFormat;
	};
	service?: {
		skipSpec?: boolean;
	};
	directive?: {
		skipSpec?: boolean;
	};
	pipe?: {
		skipSpec?: boolean;
	};
}

export interface SafeExtensionConfig {
	skipPrefix: boolean;
	skipSpec: boolean;
	component: {
		skipSpec: boolean;
		inlineTemplate: boolean;
		inlineStyle: boolean;
		withOnPushChangeDetection: boolean;
		stylesheetsFormat: StylesheetsFormat;
	};
	service: {
		skipSpec: boolean;
	};
	directive: {
		skipSpec: boolean;
	};
	pipe: {
		skipSpec: boolean;
	};
}
