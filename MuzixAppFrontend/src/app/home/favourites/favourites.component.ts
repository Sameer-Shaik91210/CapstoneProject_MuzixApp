import { Component } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {
  movies: any[] = [];

  constructor(private tmdbService: MovieService) {}

  ngOnInit(): void {
    this.tmdbService.getMovies().subscribe((data: any) => {
      this.movies = data.results;
    });
  }
}
