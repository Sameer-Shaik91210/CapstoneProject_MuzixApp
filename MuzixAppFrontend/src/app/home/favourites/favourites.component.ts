import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit{
  randomMovies: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';

  constructor(private movieService: MovieService,private router:Router) { }

  ngOnInit(): void {
    this.movieService.getRandomMovies().subscribe(response => {
      this.randomMovies = response.results;
      console.log("Random Movies:",this.randomMovies);
    })

  }
  goToMovie(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }




}
