import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favoriteMovies: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';
  isFromNavbar: boolean = false;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isFromNavbar = params['isFromNavbar'] === 'true';
      console.log('Navigated from Navbar:', this.isFromNavbar);
    });

    this.loadFavoriteMovies();
  }

  loadFavoriteMovies(): void {
    this.movieService.getFavouriteMovies().subscribe((data: any) => {
      console.log("Data from mongo", data);
      this.favoriteMovies = data || [];
    });
  }

  goToMovie(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

  isFavorite(movie: any): boolean {
    return this.favoriteMovies && this.favoriteMovies.some(fav => fav.id === movie.id);
  }

  removeFavorite(movie: any): void {
    if (this.isFavorite(movie)) {
      this.movieService.removeFavouriteMovie(movie.id).subscribe({
        next: () => {
          this.favoriteMovies = this.favoriteMovies.filter(fav => fav.id !== movie.id);
          this.snackBar.open('Movie removed from favorites!', 'success', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        },
        error: (error: any) => {
          this.snackBar.open('Failed to remove movie from favorites. Please try again later.', 'close', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
          console.error(error);
        }
      });
    }
  }
}
