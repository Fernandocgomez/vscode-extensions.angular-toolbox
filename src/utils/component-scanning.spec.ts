import { Dependency } from '@models';
import {
	getComponentDirectivesDependencies,
	getComponentModuleDependencies,
	getComponentPipesDependencies,
	getComponentProviderDependencies,
	getComponentStandaloneComponentDependencies,
} from './component-scanning';
import {
	ComponentWithModulesDirectivesPipesAndComponentsFixture,
	ComponentWithModulesEndingOnModuleFixture,
	ComponentWithModulesWithoutSuffixModuleFixture,
	ComponentWithNoModulesFixture,
	ComponentWithOnlyModulesPipesAndDirectivesFixture,
	ComponentWithoutAnyProviderFixture,
	ComponentWithoutDirectivesFixture,
	ComponentWithoutMultipleProvidersFixture,
	ComponentWithoutPipesFixture,
	ComponentWithoutStandaloneComponentsFixture,
	ComponentWithSingleProviderFixture,
	ComponentWithSingleStandaloneComponentFixture,
	ComponentWithTwoDirectivesFixture,
	ComponentWithTwoPipesFixture,
} from './fixtures';

describe('getComponentProviderDependencies', () => {
	test('should return an empty array when there are not providers being injected', () => {
		expect(getComponentProviderDependencies(ComponentWithoutAnyProviderFixture)).toEqual<
			Dependency[]
		>([]);
	});

	test('should return an array with one element', () => {
		expect(getComponentProviderDependencies(ComponentWithSingleProviderFixture)).toEqual<
			Dependency[]
		>([
			{
				className: 'CoolService',
				importPath: './services',
			},
		]);
	});

	test('should return an array with all the providers', () => {
		expect(getComponentProviderDependencies(ComponentWithoutMultipleProvidersFixture)).toEqual<
			Dependency[]
		>([
			{
				className: 'CoolService',
				importPath: './services/cool.service',
			},
			{
				className: 'GlobalService',
				importPath: '@globalServices',
			},
			{
				className: 'PublicService',
				importPath: './services/public.service',
			},
			{
				className: 'WithoutServiceSuffix',
				importPath: './services/without-service-suffix.service',
			},
			{
				className: 'ConstructorPrivateService',
				importPath: './services/constructor-private.service',
			},
			{
				className: 'ConstructorImmutablePublicService',
				importPath: './services/constructor-immutable-public.service',
			},
			{
				className: 'ConstructorMutablePublicService',
				importPath: './services/constructor-mutable-public.service',
			},
			{
				className: 'ConstructorWithoutServiceSuffix',
				importPath: './services/constructor-without-service-suffix.service',
			},
		]);
	});
});

describe('getComponentModuleDependencies', () => {
	test('should return an empty array when there is not modules present', () => {
		expect(getComponentModuleDependencies(ComponentWithNoModulesFixture)).toEqual<Dependency[]>([]);
	});

	test('should return an array with two elements', () => {
		expect(getComponentModuleDependencies(ComponentWithModulesEndingOnModuleFixture)).toEqual<
			Dependency[]
		>([
			{
				className: 'RouterModule',
				importPath: '@angular/router',
			},
			{
				className: 'CommonModule',
				importPath: '@angular/common',
			},
		]);
	});

	test('should return an array with two elements', () => {
		expect(getComponentModuleDependencies(ComponentWithModulesWithoutSuffixModuleFixture)).toEqual<
			Dependency[]
		>([
			{
				className: 'NgClass',
				importPath: '@angular/common',
			},
			{
				className: 'RouterLink',
				importPath: '@angular/router',
			},
		]);
	});

	test('should return an array with three elements', () => {
		expect(
			getComponentModuleDependencies(ComponentWithModulesDirectivesPipesAndComponentsFixture),
		).toEqual<Dependency[]>([
			{
				className: 'NgClass',
				importPath: '@angular/common',
			},
			{
				className: 'RouterLink',
				importPath: '@angular/router',
			},
			{
				className: 'CommonModule',
				importPath: '@angular/common',
			},
		]);
	});
});

describe('getComponentStandaloneComponentDependencies', () => {
	test('should return an empty array', () => {
		expect(
			getComponentStandaloneComponentDependencies(ComponentWithoutStandaloneComponentsFixture),
		).toEqual<Dependency[]>([]);
	});

	test('should return an array with one element', () => {
		expect(
			getComponentStandaloneComponentDependencies(ComponentWithSingleStandaloneComponentFixture),
		).toEqual<Dependency[]>([
			{
				className: 'AppComponent',
				importPath: './app.component',
			},
		]);
	});

	test('should return an empty array when there is not standalone components on the imports array', () => {
		expect(
			getComponentStandaloneComponentDependencies(
				ComponentWithOnlyModulesPipesAndDirectivesFixture,
			),
		).toEqual<Dependency[]>([]);
	});
});

describe('getComponentPipesDependencies', () => {
	test('should return an empty array when there are not pipes on the imports array', () => {
		expect(getComponentPipesDependencies(ComponentWithoutPipesFixture)).toEqual<Dependency[]>([]);
	});

	test('should return two elements when there are two pipes on the imports array', () => {
		expect(getComponentPipesDependencies(ComponentWithTwoPipesFixture)).toEqual<Dependency[]>([
			{
				className: 'DatePipe',
				importPath: '@angular/common',
			},
			{
				className: 'JsonPipe',
				importPath: '@angular/common',
			},
		]);
	});
});

describe('getComponentDirectivesDependencies', () => {
	test('should return an empty array when there are not directives on the imports array', () => {
		expect(getComponentDirectivesDependencies(ComponentWithoutDirectivesFixture)).toEqual<
			Dependency[]
		>([]);
	});

	test('should return two elements when there are two directives on the imports array', () => {
		expect(getComponentDirectivesDependencies(ComponentWithTwoDirectivesFixture)).toEqual<
			Dependency[]
		>([
			{
				className: 'FormControlDirective',
				importPath: '@angular/forms',
			},
			{
				className: 'FormGroupDirective',
				importPath: '@angular/forms',
			},
		]);
	});
});
