import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private tmdbUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'e5c949c7ba7f40e7bb9d1678655c4957';
  private apiUrl = 'http://localhost:9000/api/v2/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
  getFavouriteMovies(): Observable<any[]> {
    const headers = this.createHeaders();
    return this.http.get<any[]>(`${this.apiUrl}user/movies`, { headers });
  }

  saveFavouriteMovie(movie: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${this.apiUrl}user/movie`, movie, { headers });
  }

  removeFavouriteMovie(movieId: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete<any>(`${this.apiUrl}user/movie/${movieId}`, { headers });
  }

  getAllMovies(): Observable<any> {
    return this.http.get<any>(`${this.tmdbUrl}/discover/movie?api_key=${this.apiKey}`);
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.tmdbUrl}/movie/${movieId}?api_key=${this.apiKey}`);
  }


  addFavouriteMovie(movie: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${this.apiUrl}user/movie`, movie, { headers });
  }

  //get Random Movies
  getRandomMovies(): Observable<any> {
    const page1 = this.http.get(`${this.tmdbUrl}/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc&page=1`);
    const page2 = this.http.get(`${this.tmdbUrl}/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc&page=2`);
    const page3 = this.http.get(`${this.tmdbUrl}/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc&page=3`);
    const page4 = this.http.get(`${this.tmdbUrl}/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc&page=4`);
    const page5 = this.http.get(`${this.tmdbUrl}/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc&page=5`);

    return forkJoin([page1, page2, page3, page4,page5]).pipe(
      map((responses: any[]) => {
        // Combine the results from all pages into a single array
        const allMovies = responses.reduce((acc, response) => acc.concat(response.results), []);
        console.log("all movies :",allMovies)
        return allMovies;
      })
    );
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




  // public getFavouriteMoviesFromLocalStorage(): any[] {
  //   const favouriteMovies = localStorage.getItem(this.localStorageKey);
  //   return favouriteMovies ? JSON.parse(favouriteMovies) : [];
  // }



  // public setFavouriteMoviesToLocalStorage(favouriteMovies: any[]): void {
  //   localStorage.setItem(this.localStorageKey, JSON.stringify(favouriteMovies));
  // }



  searchMovies(query: string): Observable<any> {
    return this.http.get(
      `${this.tmdbUrl}/search/movie?api_key=${this.apiKey}&query=${query}&include_adult=false`
    );
  }
  // search/movie?query=Tom&include_adult=false&language=en-US&page=1%27&api_key=
}
