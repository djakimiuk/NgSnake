import { Pipe, PipeTransform } from '@angular/core';
import { PlayerHistory } from '../interfaces/player-history.interface';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Array<PlayerHistory>, filterBy: string) {
    if (!value) {
      return [];
    }
    if (filterBy === 'all') {
      return value;
    }
    return value.filter((el) => el.action === filterBy);
  }
}
