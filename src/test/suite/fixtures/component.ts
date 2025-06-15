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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DummyComponent],
    });

    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
  });

  it('should ', () => {
    expect(component).toBeTruthy();
  });
});`;

export const customComponentTemplateTestingData = `import { Component, ChangeDetectionStrategy } from '@angular/core';

// I am a custom template

@Component({
  selector: '<%= selector %>',
  standalone: true,
  imports: [],
  template: '',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= className %> {}`;

export const componentWithSeparateHtmlFixture = `import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dummy',
  standalone: true,
  imports: [],
  templateUrl: './dummy.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DummyComponent {}`;

export const componentWithSeparateCssFixture = `import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dummy',
  standalone: true,
  imports: [],
  template: '',
  styleUrls: ['./dummy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DummyComponent {}`;

export const componentWithDefaultChangeDetectionFixture = `import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dummy',
  standalone: true,
  imports: [],
  template: '',
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DummyComponent {}`;
