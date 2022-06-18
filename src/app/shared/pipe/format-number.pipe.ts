import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumberComma'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: number): any {
    if(value == undefined)
      return 0;
    return value.toLocaleString(); 
  }
}
