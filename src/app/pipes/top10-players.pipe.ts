import { Pipe, PipeTransform } from '@angular/core';
import { Scores } from '../interfaces/scores.interface';

@Pipe({
  name: 'top10Players',
})
export class Top10PlayersPipe implements PipeTransform {
  transform(value: Array<Scores>, top: number) {
    if (!value) {
      return [];
    }
    if (top <= 0) {
      return [];
    }
    return value.sort((a, b) => b.score - a.score).slice(0, top);
  }
}
