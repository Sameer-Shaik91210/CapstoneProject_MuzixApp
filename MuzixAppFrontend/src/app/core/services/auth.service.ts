import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RouterService } from './router.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://your-backend-api.com/api';

  constructor(private http: HttpClient,private routerService:RouterService) {}

  isLoggedIn: boolean = false;

  

  login(email: string, password: string): boolean {
    // Replace this with real authentication logic
    if (email === 'user@example.com' && password === 'password') {
      this.isLoggedIn = true;
      console.log("Check 2 in Auth");

      return true;
    }else{
     this.isLoggedIn=false;
     return false;
    }
  }
  logout() {
    this.isLoggedIn = false;
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login1(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
