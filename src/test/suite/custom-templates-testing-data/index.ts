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
