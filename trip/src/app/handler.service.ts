import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ErrObj }      from './error/errObj';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class HandlerService {


  constructor() { }

  handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      let body;
      var valid = true;
      try{
        body = error.json();
      }
      catch(ex){
        valid = false;
      }
      let err = "";
      if (valid){
        err = body.error || JSON.stringify(body);
      }
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    let errObj = new ErrObj();
    errObj.code = error.status;
    errObj.msg = errMsg;
    return Observable.throw(errObj);
  }

}
