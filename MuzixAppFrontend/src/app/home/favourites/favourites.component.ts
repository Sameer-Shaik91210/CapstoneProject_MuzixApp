import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit{
  favouriteMovies: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';

  constructor(private movieService: MovieService,private router:Router) { }

  ngOnInit(): void {
   this.favouriteMovies=this.movieService.getFavouriteMoviesFromLocalStorage();
   console.log("favorites",this.favouriteMovies);
  }
  goToMovie(movieId: number,isFavorite:boolean): void {
    this.router.navigate(['/movie', movieId,{isFavorite}]);
  }




}
