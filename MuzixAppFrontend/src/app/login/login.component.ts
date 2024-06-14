// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  onLogin() {
    if (!this.authService.login(this.email, this.password)) {
      alert('Login failed');
    }
  }
}
