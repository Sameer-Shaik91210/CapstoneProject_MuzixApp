import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent implements OnInit {




  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadFavoriteMovies();
  }

  loadMovies() {
    this.authService.getMovies().subscribe({
      next: (data: any[]) => {
        this.movies = data;
        console.log('Movies:', this.movies);
      },
      error: (error: any) => {
        console.error('Error fetching movies:', error);
      }
    });
  }

  loadFavoriteMovies() {
    this.authService.getFavoriteMovies().subscribe({
      next: (data: any[]) => {
        this.favoriteMovies = data;
        console.log('Favorite Movies:', this.favoriteMovies);
      },
      error: (error: any) => {
        console.error('Error fetching favorite movies:', error);
      }
    });
  }
}
