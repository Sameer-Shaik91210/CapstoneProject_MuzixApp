import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { FavoriteService } from '../../home/FavoriteService.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';
  favoriteMovies: any[] = [];
 
  constructor( private route: ActivatedRoute, 
    private favoriteService: FavoriteService,
    private movieService: MovieService,
    private snackBar: MatSnackBar,
    private router:Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      if (this.searchQuery) {
        this.fetchSearchResults();
      }
    });
    this.favoriteService.getFavoriteMovies().subscribe(favorites => {
      this.favoriteMovies = favorites;
    });
  }

  fetchSearchResults() {
    if (!this.searchQuery.trim()) {
      return;
    }

    this.movieService.searchMovies(this.searchQuery).subscribe({
      next: (data) => {
        console.log(data);
        this.searchResults = data.results.filter((movie: { poster_path: any; title: any; overview: any; release_date: any; }) => 
          movie.poster_path && movie.title && movie.overview && movie.release_date
        );
      }
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
    console.log(movieId,"movieId");
    this.router.navigate(['/movie', movieId]);
  }
}
