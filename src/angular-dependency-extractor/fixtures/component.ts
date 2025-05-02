export const ComponentWithoutAnyProviderFixture = `
import { Component } from '@angular/core';

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
import { Component, inject } from '@angular/core';
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
import { Component, inject } from '@angular/core';
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

export const ComponentWithNoModulesFixture = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [],
  providers: [],
  template: '',
})
export class DummyComponent {}
`;

export const ComponentWithModulesEndingOnModuleFixture = `
import { Component } from '@angular/core';
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

export const ComponentWithModulesWithoutSuffixModuleFixture = `
import { Component } from '@angular/core';
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

export const ComponentWithModulesDirectivesPipesAndComponentsFixture = `
import { Component } from '@angular/core';
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

export const ComponentWithoutStandaloneComponentsFixture = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [],
  providers: [],
  template: '',
})
export class DummyComponent {}
`;

export const ComponentWithSingleStandaloneComponentFixture = `
import { Component } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [AppComponent],
  providers: [],
  template: '',
})
export class DummyComponent {}
`;

export const ComponentWithOnlyModulesPipesAndDirectivesFixture = `
import { Component } from '@angular/core';
import { NgClass, CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [
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

export const ComponentWithoutPipesFixture = `
import { Component } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    CommonModule,
    FormGroupDirective,
  ],
  providers: [],
  template: '',
})
export class DummyComponent {}
`;

export const ComponentWithTwoPipesFixture = `
import { Component } from '@angular/core';
import { NgClass, CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    CommonModule,
    DatePipe,
    JsonPipe,
    FormGroupDirective,
  ],
  providers: [],
  template: '',
})
export class DummyComponent {}
`;

export const ComponentWithoutDirectivesFixture = `
import { Component } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    CommonModule,
  ],
  providers: [],
  template: '',
})
export class DummyComponent {}
`;

export const ComponentWithTwoDirectivesFixture = `
import { Component } from '@angular/core';
import { NgClass, CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroupDirective, FormControlDirective } from '@angular/forms';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    FormControlDirective,
    CommonModule,
    DatePipe,
    JsonPipe,
    FormGroupDirective,
  ],
  providers: [],
  template: '',
})
export class DummyComponent {}
`;
