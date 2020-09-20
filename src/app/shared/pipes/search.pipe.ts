import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(sortArray: Array<any>, searchString: string): Array<any> {
    if (!sortArray) {
      return [];
    }
    if (!searchString) {
      return sortArray;
    }
    else {
      const request: string = searchString.toLowerCase();
      let newArr = sortArray.filter(elem => {
        for (let key in elem) {
          const value = String(elem[key]).toLowerCase();
          if (key != 'image') {
            if (value.includes(request)) return true
          }
        }
        return false;
      });
      return newArr;
    }

  }
}
