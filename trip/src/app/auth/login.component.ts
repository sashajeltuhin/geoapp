import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './auth.service';
import { Person }      from './person';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  message: string;
  private person = new Person ();
  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }
  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
  login() {
    this.message = 'Trying to log in ...';
    this.authService.login(this.person.email, this.person.pass).subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl;
        if (!redirect){
          redirect = "/"
        }
        // Redirect the user
        this.router.navigate([redirect]);
      }
      else{
        this.message = 'Invalid credentials ...';
      }
    });
  }
  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
