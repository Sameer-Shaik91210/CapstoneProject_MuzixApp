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
  // private apiKey = '8f957d42784bfc13de55c1682ca27ba5';  // Your TMDB API Key
  private baseUrl = 'https://api.themoviedb.org/3';
  private localStorageKey = 'favouriteMovies';

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
    return this.http.get(`${this.apiUrl+"user/movies"}/favourites`);
  }



  addFavouriteMovie(movie: any): Observable<any> {
    console.log("Successfully added to user's favourites list");
    
    // Add or update isFavourite property
    movie.isFavourite = true;
    
    // Update local storage
    let favouriteMovies = this.getFavouriteMoviesFromLocalStorage();
    const existingMovieIndex = favouriteMovies.findIndex((m: any) => m.id === movie.id);

    if (existingMovieIndex === -1) {
      // Movie not in favourites, add it
      favouriteMovies.push(movie);
    } else {
      // Movie already in favourites, update it
      favouriteMovies[existingMovieIndex] = movie;
    }

    this.setFavouriteMoviesToLocalStorage(favouriteMovies);

    console.log("After sucessful addition of movie",this.getFavouriteMoviesFromLocalStorage())
    
    return this.http.post(`${this.apiUrl}/favourites`, movie);
  }

  removeFavouriteMovie(movieId: number | undefined): Observable<any> {
    console.log("Successfully removed from user's favourites list");

    // Update local storage
    let favouriteMovies = this.getFavouriteMoviesFromLocalStorage();
    const movieIndex = favouriteMovies.findIndex((movie: any) => movie.id === movieId);

    if (movieIndex !== -1) {
      // Set isFavourite to false
      favouriteMovies[movieIndex].isFavourite = false;
      this.setFavouriteMoviesToLocalStorage(favouriteMovies);
    }

    return this.http.delete(`${this.apiUrl}/favourites/${movieId}`);
  }


  public getFavouriteMoviesFromLocalStorage(): any[] {
    const favouriteMovies = localStorage.getItem(this.localStorageKey);
    return favouriteMovies ? JSON.parse(favouriteMovies) : [];
  }



  public setFavouriteMoviesToLocalStorage(favouriteMovies: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(favouriteMovies));
  }



  searchMovies(query: string): Observable<any> {
    return this.http.get(
      `${this.tmdbUrl}/search/movie?api_key=${this.apiKey}&query=${query}&include_adult=false`
    );
  }
  // search/movie?query=Tom&include_adult=false&language=en-US&page=1%27&api_key=

  
  
}
