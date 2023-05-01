import { Pipe, PipeTransform } from '@angular/core';
import { PlayerHistory } from '../../components/snake/snake.component';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: Array<PlayerHistory>, sortBy: string) {
    if (!value) {
      return value;
    }
    if (sortBy === 'asc') {
      return value.sort((a, b) => a.time - b.time);
    } else {
      value.sort((a, b) => a.time - b.time);
      return value.reverse();
    }
  }
}
