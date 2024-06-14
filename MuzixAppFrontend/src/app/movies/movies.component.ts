import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.tmdbService.getMovies().subscribe((data) => {
      this.movies = data.results;
    });
  }

}
