export const RandomImportsFixture = `
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
`;

export const DummyClassFixture = `
class Dummy {};
`;

export const ClassWithDependenciesBeingInjected = `
class DummyComponent {
  readonly #coolService = inject(CoolService);
  private readonly globalService = inject(GlobalService);
  readonly publicService = inject(PublicService);
  readonly #withoutServiceSuffix = inject(WithoutServiceSuffix);

  constructor(
    private readonly constructorPrivateService: ConstructorPrivateService,
    readonly constructorImmutablePublicService: ConstructorImmutablePublicService,
    constructorMutablePublicService: ConstructorMutablePublicService,
    private readonly constructorWithoutServiceSuffix: ConstructorWithoutServiceSuffix,
  ) {}
}
`;
