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

export const directiveSpecFixture = `import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HighlightContentOnHoverDirective } from './highlight-content-on-hover.directive';
import { Component } from '@angular/core';

@Component({
  template: \`<div [highlightContentOnHover]>Host Element</div>\`,
  standalone: true,
  imports: [HighlightContentOnHoverDirective],
})
class TestHostComponent {}

describe('HighlightContentOnHoverDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HighlightContentOnHoverDirective, TestHostComponent],
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

export const directiveWithCustomTemplateSpecFixture = `import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HighlightContentOnHoverDirective } from './highlight-content-on-hover.directive';
import { Component } from '@angular/core';

// I am a custom template

@Component({
  template: \`<div [highlightContentOnHover]>Host Element</div>\`,
  standalone: true,
  imports: [HighlightContentOnHoverDirective],
})
class TestHostComponent {}

describe('HighlightContentOnHoverDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HighlightContentOnHoverDirective, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should ', () => {
    expect(fixture).toBeTruthy();
  });
});`;

export const customDirectiveTemplateTestingData = `import { Directive } from '@angular/core';

// I am a custom template

@Directive({
  selector: '[<%= selector %>]',
  standalone: true,
})
export class <%= className %> {}`;

export const customDirectiveSpecTemplateTestingData = `import { TestBed, ComponentFixture } from '@angular/core/testing';
import { <%= className %> } from './<%= directiveFileName %>';
import { Component } from '@angular/core';

// I am a custom template

@Component({
  template: \`<div [<%= selector %>]>Host Element</div>\`,
  standalone: true,
  imports: [<%= className %>],
})
class TestHostComponent {}

describe('<%= className %>', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [<%= className %>, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should ', () => {
    expect(fixture).toBeTruthy();
  });
});`;
