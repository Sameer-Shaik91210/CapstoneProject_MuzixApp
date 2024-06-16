import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit{
  randomMovies: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getRandomMovies().subscribe(response => {
      this.randomMovies = response.results;
    })
  }
 



}
