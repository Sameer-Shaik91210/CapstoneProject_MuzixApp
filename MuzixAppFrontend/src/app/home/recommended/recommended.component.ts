import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoriteService } from '../FavoriteService.service';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {
  randomMovies: any[] = [];
  favoriteMovies: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';

  constructor(
    private movieService: MovieService,
    private router: Router,
    private favoriteService: FavoriteService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.movieService.getRandomMovies().subscribe(response => {
      this.randomMovies = response;
      console.log("Popular Movies Results:  ",this.randomMovies);
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
