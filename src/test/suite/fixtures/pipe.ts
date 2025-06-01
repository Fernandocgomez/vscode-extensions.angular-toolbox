export const pipeWithPrefixFixture = `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefixFormatNumber',
  standalone: true,
  pure: true,
})
export class FormatNumberPipe implements PipeTransform {
  transform(value: number): string {
    return '';
  }
}`;

export const pipeSpecFixture = `import { FormatNumberPipe } from './format-number.pipe';
import { TestBed } from '@angular/core/testing';

describe('FormatNumberPipe', () => {
  let pipe: FormatNumberPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormatNumberPipe],
    });
    
    pipe = TestBed.inject(FormatNumberPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});`;

export const pipeWithoutPrefixFixture = `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true,
  pure: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(value: number): string {
    return '';
  }
}`;

export const pipeSpecWithoutPrefixFixture = `import { FormatDatePipe } from './format-date.pipe';
import { TestBed } from '@angular/core/testing';

describe('FormatDatePipe', () => {
  let pipe: FormatDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormatDatePipe],
    });
    
    pipe = TestBed.inject(FormatDatePipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});`;

export const customTemplatePipeFixture = `import { Pipe, PipeTransform } from "@angular/core";

// I am a custom template

@Pipe({
  name: 'dummy',
})
export class DummyPipe implements PipeTransform {
  transform(value: number): string {
    return '';
  }
}`;
