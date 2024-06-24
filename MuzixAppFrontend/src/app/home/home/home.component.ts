import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from '../../core/services/movie.service';
import { FavoriteService } from '../FavoriteService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';

  constructor(
    private movieService: MovieService,
    private router: Router,
    private snackBar: MatSnackBar,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((data: any) => {
      this.movies = data.results;
    });

    this.favoriteService.getFavoriteMovies().subscribe(favorites => {
      this.favoriteMovies = favorites;
    });
  }

  isFavorite(movie: any): boolean {
    return this.favoriteMovies.some(fav => fav.id === movie.id);
  }

  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie)) {
      this.favoriteService.removeFavoriteMovie(movie.id);
      this.snackBar.open('Movie removed from favorites!', 'Close', {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
    } else {
      this.favoriteService.addFavoriteMovie(movie);
      this.snackBar.open('Movie added to favorites!', 'Close', {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
    }
  }

  goToMovie(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }
}
