import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { HandlerService } from '../handler.service';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  token: string;
  private headers = new Headers({'Content-Type': 'application/json'});
 
constructor(private http: Http, private handler:HandlerService) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;

    if (this.token){
    	this.isLoggedIn = true;
    }
    console.log("token in store", this.token, this.isLoggedIn);
}

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(username: string, password: string): Observable<boolean> {
        return this.http.post('/api/login', JSON.stringify({ email: username, password: password }), {headers: this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
 					this.isLoggedIn = true;
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            }).catch(this.handler.handleError);
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.isLoggedIn = false;
        localStorage.removeItem('currentUser');
    }
}
