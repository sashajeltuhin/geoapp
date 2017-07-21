import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import {GeoService} from '../geo.service';
import {MapService} from '../map/map.service';
import {ErrorService} from '../error/error.service';

@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.css']
})
export class SecretsComponent implements OnInit {
  private error;
  private cashLimit = 0;
  private account = "";
  constructor(private geo:GeoService, private maps:MapService, private errSvc: ErrorService, private router: Router) { }

  ngOnInit() {

  this.geo.getAccount()
       .subscribe(
         data => {
          this.account = data.account;
          this.loadLimit();
         },
         error =>  {
         this.error = error;
          this.errSvc.recordError(this.error, this.router);
         });

  }

  loadLimit(){
    this.geo.getLimit()
         .subscribe(
           data => {
            this.cashLimit = data.limit;
            console.log("this.cashLimit", this.cashLimit);
           },
           error =>  {
           this.error = error;
            this.errSvc.recordError(this.error, this.router);
           });
  }

}
