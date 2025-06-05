export const httpServiceFixture = `import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  readonly #http = inject(HttpClient);
}`;

export const noneHttpServiceFixture = `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logger {}`;

export const noneGlobalServiceFixture = `import { Injectable } from '@angular/core';

@Injectable()
export class Logger {}`;

export const globalServiceFixture = `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logger {}`;

export const customNoneHttpServiceFixture = `import { Injectable } from '@angular/core';

// I am a custom template

@Injectable()
export class Logger {}`;

export const customNoneHttpTemplateServiceFixture = `import { Injectable } from '@angular/core';

// I am a custom template
<% if (!isGlobal) { %>
@Injectable()
<% } else { %>
@Injectable({
  providedIn: 'root',
})
<% } %>export class <%= className %> {}`;

export const customNoneHttpServiceSpecTemplateFixture = `import { TestBed } from '@angular/core/testing';
import { <%= className %> } from './<%= serviceFileName %>';

// I am custom template

describe('<%= className %>', () => {
  let service: <%= className %>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [<%= className %>],
    });

    service = TestBed.inject(<%= className %>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});`;

export const customNoneHttpServiceSpecFixture = `import { TestBed } from '@angular/core/testing';
import { Logger } from './logger.service';

// I am custom template

describe('Logger', () => {
  let service: Logger;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Logger],
    });

    service = TestBed.inject(Logger);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});`;

export const customHttpServiceFixture = `import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// I am a custom template

@Injectable()
export class UserAuthService {
  readonly #http = inject(HttpClient);
}`;

export const customHttpServiceTemplateFixture = `import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// I am a custom template
<% if (!isGlobal) { %>
@Injectable()
<% } else { %>
@Injectable({
  providedIn: 'root',
})
<% } %>export class <%= className %> {
  readonly #http = inject(HttpClient);
}`;
