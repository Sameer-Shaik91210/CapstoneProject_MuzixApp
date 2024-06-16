import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  movieId: number | undefined;
  movieDetails: any;
  videoUrl: SafeResourceUrl | undefined;
  cast: any[] = [];
  recommendedMovies: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.movieId = +id;
        this.loadMovieData();
      } else {
        console.error('Movie ID is null');
      }
    });
  }

  loadMovieData(): void {
    this.fetchMovieDetails();
    this.fetchMovieVideos();
    this.fetchMovieCast();
    this.fetchRecommendedMovies();
  }

  fetchMovieDetails(): void {
    if (this.movieId !== undefined) {
      this.movieService.getMovieDetails(this.movieId).subscribe(
        (response) => {
          this.movieDetails = response;
          console.log(this.movieDetails);
        },
        (error) => {
          console.error('Error fetching movie details:', error);
        }
      );
    } else {
      console.error('Invalid movie ID');
    }
  }

  fetchMovieVideos(): void {
    if (this.movieId !== undefined) {
      this.movieService.getMovieVideos(this.movieId).subscribe(
        (response) => {
          if (response.results && response.results.length > 0) {
            const videoKey = response.results[0].key;
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoKey}`);
          }
        },
        (error) => {
          console.error('Error fetching movie videos:', error);
        }
      );
    } else {
      console.error('Invalid movie ID');
    }
  }

  fetchMovieCast(): void {
    if (this.movieId !== undefined) {
      this.movieService.getMovieCast(this.movieId).subscribe(
        (response) => {
          this.cast = response.cast;
        },
        (error) => {
          console.error('Error fetching movie cast:', error);
        }
      );
    } else {
      console.error('Invalid movie ID');
    }
  }

  fetchRecommendedMovies(): void {
    if (this.movieId !== undefined) {
      this.movieService.getRecommendedMovies(this.movieId).subscribe(
        (response) => {
          this.recommendedMovies = response.results;
        },
        (error) => {
          console.error('Error fetching recommended movies:', error);
        }
      );
    } else {
      console.error('Invalid movie ID');
    }
  }

  goToMovie(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }
}
