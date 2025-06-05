export interface ExtensionConfig {
	component?: {
		skipSpec?: boolean;
		inlineTemplate?: boolean;
		inlineStyle?: boolean;
		withOnPushChangeDetection?: boolean;
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
