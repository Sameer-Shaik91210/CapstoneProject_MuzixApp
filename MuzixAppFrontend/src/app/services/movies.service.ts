import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  //private apiUrl = 'https://api.example.com/movies';
  apiUrl: string = "http://localhost:8081/api/v1/";
  constructor(private http: HttpClient) { }

  getFavoriteMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/favorites`);
  }

  getRecommendedMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recommendations`);
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${query}`);
  }
}
