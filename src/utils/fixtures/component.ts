export const ComponentWithoutAnyProviderFixture = `
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [],
  providers: [],
  template: '',
})
export class DummyComponent {}
`;

export const ComponentWithSingleProviderFixture = `
import { Component, Input, inject } from '@angular/core';
import { CoolService } from './services';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [],
  providers: [CoolService],
  template: '',
})
export class DummyComponent {
  readonly #coolService = inject(CoolService);
}
`;

export const ComponentWithoutMultipleProvidersFixture = `
import { Component, Input, inject } from '@angular/core';
import { CoolService } from './services/cool.service';
import { PublicService } from './services/public.service';
import { ConstructorPrivateService } from './services/constructor-private.service';
import { GlobalService } from '@globalServices';
import { ConstructorImmutablePublicService } from './services/constructor-immutable-public.service';
import { ConstructorMutablePublicService } from './services/constructor-mutable-public.service';
import { WithoutServiceSuffix } from './services/without-service-suffix.service';
import { ConstructorWithoutServiceSuffix } from './services/constructor-without-service-suffix.service';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [],
  providers: [
    CoolService,
    PublicService,
    ConstructorPrivateService,
    ConstructorImmutablePublicService,
    ConstructorMutablePublicService,
    WithoutServiceSuffix,
    ConstructorWithoutServiceSuffix,
  ],
  template: '',
})
export class DummyComponent {
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

export const ComponentWithNoModules = `
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [],
  providers: [],
  template: '',
})
export class DummyComponent {}
`;

export const ComponentWithModulesEndingOnModule = `
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    AppComponent,
  ],
  providers: [],
  template: '',
})
export class DummyComponent {}
`;

export const ComponentWithModulesWithoutSuffixModule = `
import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppComponent } from './app.component';


@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [
    AppComponent,
    NgClass,
    RouterLink,
  ],
  providers: [],
  template: '',
})
export class DummyComponent {}
`;

export const ComponentWithModulesDirectivesPipesAndComponents = `
import { Component, Input } from '@angular/core';
import { NgClass, CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppComponent } from './app.component';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [
    AppComponent,
    NgClass,
    RouterLink,
    CommonModule,
    DatePipe,
    FormGroupDirective,

  ],
  providers: [],
  template: '',
})
export class DummyComponent {}
`;
