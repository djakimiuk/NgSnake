import { Pipe, PipeTransform } from '@angular/core';
import { PlayerHistory } from './snake/snake.component';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Array<PlayerHistory>, filterBy: string) {
    if (!value) {
      return value;
    }
    if (filterBy === 'all') {
      return value;
    }
    return value.filter((el) => {
      if (el.action === filterBy) {
        return true;
      }
      return false;
    });
  }
}
