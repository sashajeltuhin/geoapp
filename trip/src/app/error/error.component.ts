import { Component, OnInit } from '@angular/core';
import {ErrorService} from './error.service';
import { ErrObj }      from './errObj';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
	errObj: ErrObj;
    constructor(private svc:ErrorService) {
    }

  ngOnInit() {
  		this.errObj = this.svc.getError();
      if (!this.errObj){
        this.errObj = new ErrObj("Everything is ok. False alarm");
      }
  }

}
