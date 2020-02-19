import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatCurrency'})

export class FormatCurrency implements PipeTransform {
  transform(value: number): string {
    const penniesTOPound = (value / 100).toFixed(2);
    return `${penniesTOPound}`;
  }
}