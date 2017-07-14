import { Component } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { Router }      from '@angular/router';
import {GeoService} from './geo.service';
import { Label }      from './search/labels';
import {ErrorService} from './error/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(private titleService: Title, private geo:GeoService, private errSvc: ErrorService, private router: Router ) {
   this.geo.getLabels()
       .subscribe(
         labels => {
          console.log("labels", labels);
          this.setTitle (labels.appTitle);
         },
         error =>  {
          this.errSvc.recordError(error, this.router);
         });
  }
 
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}
