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
    });
  }

  markAsFavourite(movie: any): void {
    this.movieService.saveFavouriteMovie(movie).subscribe(response => {
      console.log('Movie saved as favourite:', response);
      // Optionally, you can add logic to give feedback to the user, like showing a success message
    }, error => {
      console.error('Error saving favourite movie:', error);
    });
  }
}
