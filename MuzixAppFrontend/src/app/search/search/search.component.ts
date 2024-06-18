import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

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
        this.searchResults = data.results;
      }
    });
  }
}
