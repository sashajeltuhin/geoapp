import { Injectable } from '@angular/core';
import { ErrObj }      from './errObj';
import { Router }      from '@angular/router';

@Injectable()
export class ErrorService {
 private errObj: ErrObj;

  constructor() { 
   
  }

  getError(){
  	return this.errObj;
  }

  recordError(err: ErrObj, router: Router){
  	this.errObj = err;
  	if (router){
  		if (this.errObj.code == 401){
         router.navigate(['/login']);
         }
         else{
            router.navigate(['/oops']);
         }
  	}
  }
}