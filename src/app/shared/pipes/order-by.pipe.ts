import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: Array<any>, order: string, reverse: boolean): Array<any> {
    if (!value) {
      return [];
    }
    if (!order) {
      return value;
    }
    let val = [];
    let lowerA: string;
    let lowerB: string;
    if (typeof value[0][order] !== 'number') {
      val = value.sort((a, b) => {
        if (order == 'date') {
          lowerA = a[order].seconds;
          lowerB = b[order].seconds;
        }
        else {
          lowerA = a[order].toLowerCase();
          lowerB = b[order].toLowerCase();
        }
        if (lowerA === lowerB) return 0;
          return lowerA > lowerB ? 1 : -1;
      });
    }
    else {
      val = value.sort((a, b) => a[order] - b[order]);
    }
    return !reverse ? val : val.reverse();
  }

}
