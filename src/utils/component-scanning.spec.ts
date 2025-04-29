import {
	getComponentModuleDependencies,
	getComponentProviderDependencies,
} from './component-scanning';
import {
	ComponentWithModulesDirectivesPipesAndComponents,
	ComponentWithModulesEndingOnModule,
	ComponentWithModulesWithoutSuffixModule,
	ComponentWithNoModules,
	ComponentWithoutAnyProviderFixture,
	ComponentWithoutMultipleProvidersFixture,
	ComponentWithSingleProviderFixture,
} from './fixtures';

describe('getComponentProviderDependencies', () => {
	test('should return an empty array when there are not providers being injected', () => {
		expect(getComponentProviderDependencies(ComponentWithoutAnyProviderFixture)).toEqual([]);
	});

	test('should return an array with one element', () => {
		expect(getComponentProviderDependencies(ComponentWithSingleProviderFixture)).toEqual([
			{
				className: 'CoolService',
				importPath: './services',
			},
		]);
	});

	test('should return an array with all the providers', () => {
		expect(getComponentProviderDependencies(ComponentWithoutMultipleProvidersFixture)).toEqual([
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
		expect(getComponentModuleDependencies(ComponentWithNoModules)).toEqual([]);
	});

	test('should return an array with two elements', () => {
		expect(getComponentModuleDependencies(ComponentWithModulesEndingOnModule)).toEqual([
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
		expect(getComponentModuleDependencies(ComponentWithModulesWithoutSuffixModule)).toEqual([
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
			getComponentModuleDependencies(ComponentWithModulesDirectivesPipesAndComponents),
		).toEqual([
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
