// TODO: Normalize interfaces

import { StylesheetsFormat } from '../types';

export interface Dependency {
	className: string;
	importPath: string;
}

export interface ComponentSpecTemplateData {
	className: string; // MyCoolComponent
	componentNameAsKebabCase: string; // my-cool
	providers: Dependency[];
	modules: Dependency[];
	components: Dependency[];
	pipes: Dependency[];
	directives: Dependency[];
}

export interface ComponentTemplateData {
	className: string; // MyCoolComponent
	selector: string; // my-cool
	componentNameAsKebabCase: string; // my-cool
	inlineTemplate: boolean;
	inlineStyle: boolean;
	withOnPushChangeDetection: boolean;
	stylesheetsFormat: StylesheetsFormat;
}

export interface ComponentStorybookTemplateData {
	className: string; // MyCoolComponent
	componentNameAsKebabCase: string; // my-cool
}

export interface ServiceTemplateData {
	isGlobal: boolean; // true or false
	className: string; // UserAuthService(HTTP) or Logger(None Http)
}

export interface ServiceSpecTemplateData {
	className: string; // UserAuthService(HTTP) or Logger(None Http)
	serviceFileName: string; // user-auth.service.ts or logger.service.ts
	providers: Dependency[];
}

export interface PipeTemplateData {
	className: string; // SimpleFormatPipe
	selector: string; // appSimpleFormat
}

export interface PipeSpecTemplateData {
	className: string; // SimpleFormatPipe
	pipeNameAsKebabCase: string; // simple-format
	providers: Dependency[];
}

export interface DirectiveTemplateData {
	className: string; // HighlightContentOnHoverDirective
	selector: string; // appHighlightContentOnHover
}

// TODO: support to extract component, modules, pipes, and directives
export interface DirectiveSpecTemplateData {
	className: string; // HighlightContentOnHoverDirective
	directiveFileName: string; // highlight-content-on-hover.directive
	providers: Dependency[];
	selector: string; // appHighlightContentOnHover
	// components: Dependency[];
	// pipes: Dependency[];
	// directives: Dependency[];
	// modules: Dependency[];
}
