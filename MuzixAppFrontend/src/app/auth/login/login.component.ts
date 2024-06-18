// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterService } from '../../core/services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userId: string = '';
  password: string = '';
  constructor(public authService: AuthService, private routerService: RouterService) {}
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  onLogin() {
    if (!this.authService.login(this.userId, this.password)) {
      alert('Login failed');
    }else{
      console.log("Check 1 in login");
      this.routerService.toHome();
    }
  }

}
