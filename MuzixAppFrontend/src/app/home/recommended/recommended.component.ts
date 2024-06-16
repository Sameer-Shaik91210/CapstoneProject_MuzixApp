import { Component } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.css'
})
export class RecommendedComponent {
  randomMovies: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getRandomMovies().subscribe(response => {
      this.randomMovies = response.results;
    })
  }
}
