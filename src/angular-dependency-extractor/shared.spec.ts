import {
	ClassWithDependenciesBeingInjected,
	DummyClassFixture,
	RandomImportsFixture,
} from './fixtures';
import { getAllClassNamesBeingInjected, getAllImportStatements } from './shared';

describe('getAllImportStatements', () => {
	test('should collect all the imports in this format { "ClassName": "@Path" }', () => {
		expect(getAllImportStatements(RandomImportsFixture)).toEqual({
			Injectable: '@angular/core',
			inject: '@angular/core',
			HttpClient: '@angular/common/http',
		});
	});

	test('should return an empty record when there are not imports present', () => {
		expect(getAllImportStatements(DummyClassFixture)).toEqual({});
	});
});

describe('getAllClassNamesBeingInjected', () => {
	test('should return all the classes being inject via the inject function or the constructor', () => {
		expect(getAllClassNamesBeingInjected(ClassWithDependenciesBeingInjected)).toEqual(
			new Set([
				'CoolService',
				'GlobalService',
				'PublicService',
				'WithoutServiceSuffix',
				'ConstructorPrivateService',
				'ConstructorImmutablePublicService',
				'ConstructorMutablePublicService',
				'ConstructorWithoutServiceSuffix',
			]),
		);
	});

	test('should return an empty Set when there are not classes being injected via the inject function or the constructor', () => {
		expect(getAllClassNamesBeingInjected(DummyClassFixture)).toEqual(new Set());
	});
});
