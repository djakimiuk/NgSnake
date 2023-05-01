import { Pipe, PipeTransform } from '@angular/core';
import { Scores } from '../interfaces/scores.interface';

@Pipe({
  name: 'sortPlayers'
})
export class SortPlayersPipe implements PipeTransform {

  transform(value: Array<Scores>, sortBy: string) {
    if (!value) {
      return value;
    }
    if (sortBy === 'asc') {
      return value.sort((a, b) => a.score - b.score);
    } else {
      value.sort((a, b) => a.score - b.score);
      return value.reverse();
    }
  }

}
