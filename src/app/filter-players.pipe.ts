import { Pipe, PipeTransform } from '@angular/core';
import { Scores } from './interfaces/scores.interface';

@Pipe({
  name: 'filterPlayers',
})
export class FilterPlayersPipe implements PipeTransform {
  transform(value: Array<Scores>, filterBy: string) {
    if (!value) {
      return [];
    }
    if (filterBy === 'all') {
      return value;
    }
    return value.filter((el) => el.name === filterBy);
  }
}
