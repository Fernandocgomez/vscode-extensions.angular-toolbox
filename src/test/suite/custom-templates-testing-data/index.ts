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

export const customPipeTemplateTestingData = `import { Pipe, PipeTransform } from "@angular/core";

// I am a custom template

@Pipe({
  name: '<%= selector %>',
})
export class <%= className %> implements PipeTransform {
  transform(value: number): string {
    return '';
  }
}`;

export const customDirectiveTemplateTestingData = `import { Directive } from '@angular/core';

// I am a custom template

@Directive({
  selector: '[<%= selector %>]',
  standalone: true,
})
export class <%= className %> {}`;

export const customDirectiveSpecTemplateTestingData = `import { TestBed, Component } from '@angular/core/testing';
import { <%= className %> } from './<%= directiveFileName %>';

// I am a custom template

@Component({
  template: \`<div [<%= selector %>]>Host Element</div>\`,
  standalone: true,
  imports: [<%= className %>]
})
class TestHostComponent {}

describe('<%= className %>', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [<%= className %>, TestHostComponent]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should ', () => {
    expect(fixture).toBeTruthy();
  });
});`;
