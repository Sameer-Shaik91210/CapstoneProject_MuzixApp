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

  constructor(private http: HttpClient, private routerService: RouterService) {}

  login(user: any): Observable<any> {
    //return this.http.post<any>(`${this.apiUrl}login`, { userId, password });
    return this.http.post<any>(`${this.apiUrl}login`,user, { responseType: 'text' as 'json' });
  }
  register(user: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }
  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}movies`);
  }

  getFavoriteMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}favorite-movies`);
  }
  saveToken(token: any) {
    console.log("data",token)
    // console.log(token?.token,"token")
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
