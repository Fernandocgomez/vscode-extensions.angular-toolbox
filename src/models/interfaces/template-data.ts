export interface Dependency {
	className: string;
	importPath: string;
}

export interface ComponentSpecTemplateData {
	className: string;
	componentNameAsKebabCase: string;
	providers: Dependency[];
	modules: Dependency[];
	components: Dependency[];
	pipes: Dependency[];
	directives: Dependency[];
}

export interface ComponentTemplateData {
	className: string;
	selector: string;
	componentNameAsKebabCase: string;
}
