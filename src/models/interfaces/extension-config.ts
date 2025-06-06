import { StylesheetsFormat } from '../types';

export interface ExtensionConfig {
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
