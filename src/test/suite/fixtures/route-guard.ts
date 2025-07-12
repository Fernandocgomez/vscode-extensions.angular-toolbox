export const routeGuardFixture = `import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const dummyGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  return true;
};`;

export const routeGuardSpecFixture = `import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, UrlTree, provideRouter } from '@angular/router';
import { dummyGuard } from './dummy.guard';

describe('dummyGuard', () => {
  let router: Router;

  const executeGuard: CanActivateFn = (...args) => 
    TestBed.runInInjectionContext(() => dummyGuard(...args));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    router = TestBed.inject(Router);
  });

  it('should be created and executable', () => {
    expect(executeGuard).toBeDefined();
  });
});`;
