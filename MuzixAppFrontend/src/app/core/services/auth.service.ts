import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterService } from './router.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:9000/api/v1/';

  constructor(private http: HttpClient, private routerService: RouterService) {}

  login(userId: string, password: string): Observable<any> {
    //return this.http.post<any>(`${this.apiUrl}login`, { userId, password });
    return this.http.post<any>(this.apiUrl+"login",{userId, password});
  }
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}register`, user);
  }
  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('jwtToken');
  }
}
