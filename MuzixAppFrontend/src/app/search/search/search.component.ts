import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';

  constructor(private route: ActivatedRoute, private movieService: MovieService,private router:Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      if (this.searchQuery) {
        this.fetchSearchResults();
      }
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
  goToMovie(movieId: number): void {
    console.log(movieId,"movieId");
    this.router.navigate(['/movie', movieId]);
  }
}
