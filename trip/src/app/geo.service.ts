import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AuthService } from './auth/auth.service';
import { HandlerService } from './handler.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Poi }      from './search/poi';
import { Label }      from './search/labels';

@Injectable()
export class GeoService {
private url = "/api/";
private headers;

  constructor(private http: Http, private auth: AuthService, private handler:HandlerService) { 
   this.headers = new Headers({'Content-Type': 'application/json'});
  }

  getLabels():Observable<Label>{
    this.addAuthHeader();
    return this.http.get(this.url + "labels", {headers: this.headers})
                  .map(this.extractData)
                  .catch(this.handler.handleError);
  }

  getRoute(search):Observable<any>{
    this.addAuthHeader();
    this.url = this.url.replace("^^search^^", search);
    return this.http.post(this.url + "map", {"search":search}, {headers: this.headers} )
                      .map(this.extractData)
                      .catch(this.handler.handleError);
  }

  lookup(search):Observable<Poi[]>{
    this.addAuthHeader();
    return this.http.post(this.url + "lookup", {"place":search}, {headers: this.headers})
                  .map(this.extractData)
                  .catch(this.handler.handleError);
  }

  private addAuthHeader(){
    if (this.auth.token && !this.headers.has('Authorization')) {
        this.headers.append('Authorization', this.auth.token);
     }
  }

  private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
