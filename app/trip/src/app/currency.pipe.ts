import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, format: string): string {
  console.log(value, format)
  	if (value > 0){
  		  return "$ " + value;
  	}
    else{
      return "No amount";
    }
  }

}
