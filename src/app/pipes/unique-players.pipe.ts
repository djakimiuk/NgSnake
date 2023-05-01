import { Pipe, PipeTransform } from '@angular/core';
import { Scores } from '../interfaces/scores.interface';
@Pipe({
  name: 'uniquePlayers',
})
export class UniquePlayersPipe implements PipeTransform {
  transform(value: Array<Scores>) {
    if (!value) {
      return [];
    }
    return [...new Set(value.map((p) => p.name))];
  }
}
