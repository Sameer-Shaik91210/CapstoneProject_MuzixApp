import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private apiKey: string = 'https://www.themoviedb.org/u/Sweety%40123';
  private apiUri: string = 'https://api.themoviedb.org/3';
  private apiUrl: string = 'https://www.themoviedb.org/movie';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}`);
  }
}
