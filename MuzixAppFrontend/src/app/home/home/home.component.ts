import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from '../../core/services/token.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  genre_ids: number[] | undefined;

  movies: any[] = [

];
    favoriteMovies: any[] = [];
    imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';

    constructor(private movieService: MovieService, private router: Router,
      private snackBar:MatSnackBar, private genreService:TokenService) {}

    ngOnInit(): void {
      this.movieService.getAllMovies().subscribe((data: any) => {
        this.movies = data.results;
      });

      this.loadFavoriteMovies();
    }

    loadFavoriteMovies(): void {
      this.movieService.getFavouriteMovies().subscribe((data: any) => {
        this.favoriteMovies = data;
      });
    }

    isFavorite(movie: any): boolean {
      return this.favoriteMovies && this.favoriteMovies.some(fav => fav.id === movie.id);
    }

    toggleFavorite(movie: any): void {
      if (this.isFavorite(movie)) {
        this.movieService.removeFavouriteMovie(movie.id).subscribe(() => {
          this.favoriteMovies = this.favoriteMovies.filter(fav => fav.id !== movie.id);
        });
      } else {
        this.movieService.saveFavouriteMovie(movie).subscribe((newFavorite) => {
          this.favoriteMovies.push(newFavorite);
        });
      }
    }

    addFavorite(movie: any): void {
      if (!this.isFavorite(movie)) {
        this.movieService.saveFavouriteMovie(movie).subscribe({
          next: () => {
            this.favoriteMovies.push(movie);
            this.snackBar.open('Movie added to favorites!', 'success', {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-primary']
            });
          },
          error: (error: any) => {
            this.snackBar.open('Failed to add movie to favorites. Please try again later.', 'close', {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-warn']
            });
            console.error(error);
          }
        });
      }
    }

    /*



  addFavorite(movie: any): void {
      if (!this.isFavorite(movie)) {
        this.movieService.saveFavouriteMovie(movie).subscribe((newFavorite) => {
          this.favoriteMovies.push(newFavorite);
        });
      }
    }

    addFavorite(movie: any): void {
      if (this.favoriteMovies && !this.isFavorite(movie)) {
        this.movieService.saveFavouriteMovie(movie).subscribe(() => {
          this.favoriteMovies.push(movie);
        });
      }
    } */
    goToMovie(movieId: number): void {
      this.router.navigate(['/movie', movieId]);
    }


  }



