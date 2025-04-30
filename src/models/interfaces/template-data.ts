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
}
