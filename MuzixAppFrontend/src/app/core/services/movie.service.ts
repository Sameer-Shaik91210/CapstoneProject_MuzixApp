import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private tmdbUrl = 'https://api.themoviedb.org/3';
  // private apiUrl = 'http://your-backend-api.com/api';
  private apiKey = 'e5c949c7ba7f40e7bb9d1678655c4957';
  apiUrl: string = "http://localhost:8081/api/v1/";


  constructor(private http: HttpClient) {}


  //get Random Movies
  getRandomMovies():Observable<any>{
    return this.http.get(
      `${this.tmdbUrl}/discover/movie?api_key=${this.apiKey}`
    );
  }
  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.tmdbUrl}/movie/${movieId}?api_key=${this.apiKey}`);
  }


  getMovieVideos(movieId: number): Observable<any> {
    return this.http.get(
      `${this.tmdbUrl}/movie/${movieId}/videos?api_key=${this.apiKey}`
    );
  }

  getMovieCast(movieId: number): Observable<any> {
    return this.http.get(
      `${this.tmdbUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`
    );
  }

  getRecommendedMovies(movieId: number): Observable<any> {
    return this.http.get(
      `${this.tmdbUrl}/movie/${movieId}/recommendations?api_key=${this.apiKey}`
    );
  }

  getPopularMovies(): Observable<any> {
    return this.http.get(
      `${this.tmdbUrl}/movie/popular?api_key=${this.apiKey}`
    );
  }

  getFavouriteMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/favourites`);
  }

  addFavouriteMovie(movieId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/favourites`, { movieId });
  }

  removeFavouriteMovie(movieId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favourites/${movieId}`);
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(
      `${this.tmdbUrl}/search/movie?api_key=${this.apiKey}&query=${query}`
    );
  }

  
  
}
