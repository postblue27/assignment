import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {

  transform(currencyName: string): string {
    switch(currencyName) {
      case 'dollar':
        return '$';
      case 'rub':
        return '₽';
      case 'kr':
        return 'kr';
      case 'inr':
        return '₹';
      case 'cny':
        return '¥';
      case 'euro':
        return '€';
      case 'chf':
        return '₣';
      case 'gbp':
        return '£';
      default:
        return '';
    }
  }

}
