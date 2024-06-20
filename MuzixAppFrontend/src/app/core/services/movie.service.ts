import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private tmdbUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'e5c949c7ba7f40e7bb9d1678655c4957';
  apiUrl: string = "http://localhost:9000/api/v2/";

  constructor(private http: HttpClient, private authService: AuthService) { }

  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getFavouriteMovie(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get<any>(`${this.apiUrl}user/movies`, { headers });
  }

  saveFavouriteMovie(movie: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${this.apiUrl}user/movie`, movie, { headers });
  }
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
    return this.http.get(`${this.apiUrl+"user/movies"}/favourites`);
  }

  addFavouriteMovie(movieId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/favourites`, { movieId });
  }

  removeFavouriteMovie(movieId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favourites/${movieId}`);
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(
      `${this.tmdbUrl}/search/movie?api_key=${this.apiKey}&query=${query}&include_adult=false`
    );
  }
  // search/movie?query=Tom&include_adult=false&language=en-US&page=1%27&api_key=

  
  


}
