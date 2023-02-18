import { Pipe, PipeTransform } from '@angular/core';
import { PlayerHistory } from './snake/snake.component';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: Array<PlayerHistory>, sortBy: string) {
    if (!value) {
      return value;
    }
    if (sortBy === 'asc') {
      return value.sort();
    } else {
      value.sort();
      return value.reverse();
    }
  }
}
