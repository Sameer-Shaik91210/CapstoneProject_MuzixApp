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
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private routerService:RouterService) { }

  onLogin() {
    if (!this.authService.login(this.email, this.password)) {
      alert('Login failed');
    }else{
      console.log("Check 1 in login");
      this.routerService.toDashboard();
    }
  }
}