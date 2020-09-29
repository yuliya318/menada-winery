import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

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
        if (elem.name.includes(request)) return true
        return false;
      });
      return newArr;
    }

  }

}
