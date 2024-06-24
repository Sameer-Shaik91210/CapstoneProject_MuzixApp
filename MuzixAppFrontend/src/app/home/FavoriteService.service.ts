import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieService } from '../core/services/movie.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoriteMoviesSubject = new BehaviorSubject<any[]>([]);
  favoriteMovies$ = this.favoriteMoviesSubject.asObservable();

  constructor(private movieService: MovieService) {
    this.loadFavoriteMovies();
  }

  private loadFavoriteMovies(): void {
    this.movieService.getFavouriteMovies().subscribe((data: any) => {
      this.favoriteMoviesSubject.next(data || []);
    });
  }

  getFavoriteMovies(): Observable<any[]> {
    return this.favoriteMovies$;
  }

  addFavoriteMovie(movie: any): void {
    this.movieService.addFavouriteMovie(movie).subscribe(() => {
      const currentFavorites = this.favoriteMoviesSubject.value;
      this.favoriteMoviesSubject.next([...currentFavorites, movie]);
    });
  }

  removeFavoriteMovie(movieId: number): void {
    this.movieService.removeFavouriteMovie(movieId).subscribe(() => {
      const currentFavorites = this.favoriteMoviesSubject.value.filter(fav => fav.id !== movieId);
      this.favoriteMoviesSubject.next(currentFavorites);
    });
  }
}
