import { getComponentProviderDependencies } from './component-scanning';
import {
	ComponentWithoutAnyProviderFixture,
	ComponentWithoutMultipleProvidersFixture,
	ComponentWithSingleProviderFixture,
} from './fixtures';

describe('getComponentProviderDependencies', () => {
	test('should return an empty array when there are not providers being injected', () => {
		expect(
			getComponentProviderDependencies(ComponentWithoutAnyProviderFixture),
		).toEqual([]);
	});

	test('should return an array with one element', () => {
		expect(
			getComponentProviderDependencies(ComponentWithSingleProviderFixture),
		).toEqual([
			{
				className: 'CoolService',
				importPath: './services',
			},
		]);
	});

	test('should return an array with all the providers', () => {
		expect(
			getComponentProviderDependencies(
				ComponentWithoutMultipleProvidersFixture,
			),
		).toEqual([
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
