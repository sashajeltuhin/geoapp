import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(value: number, format: string): string {
  console.log(value, format)
  	if (value < 1000){
  		return value + " meters";
  	}
  	else{
  	    var div = Math.floor(value/1000);
	      var rem = Math.floor(value % 1000);
  		  return div + " km and " + rem + " meters";
  	}
  }

}
