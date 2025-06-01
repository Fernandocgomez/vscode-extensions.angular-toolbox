export const componentWithPrefixFixture = `import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'prefix-dummy',
  standalone: true,
  imports: [],
  template: '',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DummyComponent {}`;

export const componentWithoutPrefixFixture = `import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dummy',
  standalone: true,
  imports: [],
  template: '',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DummyComponent {}`;

export const componentWithoutPrefixGeneratedUsingCustomTemplateFixture = `import { Component, ChangeDetectionStrategy } from '@angular/core';

// I am a custom template

@Component({
  selector: 'dummy',
  standalone: true,
  imports: [],
  template: '',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DummyComponent {}`;

export const componentSpecFixture = `import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DummyComponent } from './dummy.component';

describe('DummyComponent', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
  });

  it('should ', () => {
    expect(component).toBeTruthy();
  });
});`;
