export const directiveWithPrefixFixture = `import { Directive } from '@angular/core';

@Directive({
  selector: '[prefixHighlightContentOnHover]',
  standalone: true,
})
export class HighlightContentOnHoverDirective {}`;

export const directiveWithoutPrefix = `import { Directive } from '@angular/core';

@Directive({
  selector: '[highlightContentOnHover]',
  standalone: true,
})
export class HighlightContentOnHoverDirective {}`;

export const directiveSpecFixture = `import { TestBed, Component } from '@angular/core/testing';
import { HighlightContentOnHoverDirective } from './highlight-content-on-hover.directive';

@Component({
  template: \`<div [prefixHighlightContentOnHover]>Host Element</div>\`,
  standalone: true,
  imports: [HighlightContentOnHoverDirective]
})
class TestHostComponent {}

describe('HighlightContentOnHoverDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [HighlightContentOnHoverDirective, TestHostComponent]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should ', () => {
    expect(fixture).toBeTruthy();
  });
});`;

export const directiveWithCustomTemplateFixture = `import { Directive } from '@angular/core';

// I am a custom template

@Directive({
  selector: '[highlightContentOnHover]',
  standalone: true,
})
export class HighlightContentOnHoverDirective {}`;

export const directiveWithCustomTemplateSpecFixture = `import { TestBed, Component } from '@angular/core/testing';
import { HighlightContentOnHoverDirective } from './highlight-content-on-hover.directive';

// I am a custom template

@Component({
  template: \`<div [highlightContentOnHover]>Host Element</div>\`,
  standalone: true,
  imports: [HighlightContentOnHoverDirective]
})
class TestHostComponent {}

describe('HighlightContentOnHoverDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [HighlightContentOnHoverDirective, TestHostComponent]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should ', () => {
    expect(fixture).toBeTruthy();
  });
});`;
