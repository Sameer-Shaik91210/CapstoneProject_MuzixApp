import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterService } from './router.service';
import { Login } from '../../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:9000/api/v1/';
  private registerUrl = 'http://localhost:9000/api/v2/register';

  // private loggedIn=false;

  constructor(private http: HttpClient, private routerService: RouterService) {}

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, user, { responseType: 'text' as 'json' });
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  saveToken(token: any): void {
    // this.loggedIn=true;
    console.log('data', token);
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.routerService.toLogin();
  }
}
