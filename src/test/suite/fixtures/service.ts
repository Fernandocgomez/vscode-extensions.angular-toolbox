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
