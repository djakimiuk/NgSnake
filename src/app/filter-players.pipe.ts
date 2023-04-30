import { Pipe, PipeTransform } from '@angular/core';
import { Scores } from './highscores/highscores.component';

@Pipe({
  name: 'filterPlayers',
})
export class FilterPlayersPipe implements PipeTransform {
  transform(value: Array<Scores>, filterBy: string, playerName: string) {
    if (!value) {
      return [];
    }
    if (filterBy === 'all') {
      return value;
    }
    if (filterBy === 'my-scores') {
      return value.filter((el) => el.name === playerName);
    }
    return value.filter((el) => el.name === filterBy);
  }
}
