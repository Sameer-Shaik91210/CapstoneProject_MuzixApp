import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  login(email: string, password: string): boolean {
    // Replace this with real authentication logic
    if (email === 'user@example.com' && password === 'password') {
      this.isLoggedIn = true;
      this.router.navigate(['/movies']);
      return true;
    }
    return false;
  }
  logout() {
    this.isLoggedIn = false;
  }
}
