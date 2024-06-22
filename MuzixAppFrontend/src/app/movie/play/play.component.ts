import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieService } from '../../core/services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';


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
  isFavorite: boolean = false; // New property to track favorite status
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar, // Inject MatSnackBar service
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.movieId = +id;
        this.loadMovieData();
        this.loadFavoriteMovies();

      } else {
        console.error('Movie ID is null');
      }
    }
    )
  }
  loadMovies() {
    this.movieService.getAllMovies().subscribe({
      next: (data: any[]) => {
        this.movies = data;
        console.log('Movies:', this.movies);
      },
      error: (error: any) => {
        console.error('Error fetching movies:', error);
      }
    });
  }

  loadMovieData(): void {
    this.loadMovies();
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
          console.log("fetchedMovieDetails", this.movieDetails);
          this.checkFavoriteStatus(); // Check the favorite status when details are fetched
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
          console.log("Fetched Movie Trailers data", response);

          if (response.results && response.results.length > 0) {
            console.log("Fetched Movie Trailer", response.results[0]);
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
          console.log("Crew", response);
          this.cast = response.crew.filter((cast: any) => cast.profile_path != null);


          console.log("this crew", this.cast);

          // data.results.filter((movie: { poster_path: any; title: any; overview: any; release_date: any; }) =>
          //   movie.poster_path && movie.title && movie.overview && movie.release_date
          // );
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
          console.log("Fetched Recommended Movies ", response.results);
          this.recommendedMovies = response.results.filter((movie: any) => (movie.poster_path != null));
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
    this.isFavorite = false;
    this.router.navigate(['/movie', movieId]);
  }

  // New methods for handling favorite status


  toggleFavorite(): void {
    if (this.isFavorite) {
      this.movieService.removeFavouriteMovie(this.movieDetails.id).subscribe(() => {
        this.isFavorite = false;
        this.showFavoriteSnackBar();
      });
    } else {
      this.movieService.saveFavouriteMovie(this.movieDetails).subscribe((newFavorite) => {
        this.isFavorite = true;
        this.showFavoriteSnackBar();
      });
    }
  }

  showFavoriteSnackBar(): void {
    const message = this.isFavorite ? 'Marked as favorite' : 'Unmarked as favorite';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-primary']
    });
  }

  checkFavoriteStatus(): void {
    if (this.movieDetails) {
      this.isFavorite = this.favoriteMovies.some(fav => fav.id === this.movieDetails.id);
    }
  }
  loadFavoriteMovies(): void {
    this.movieService.getFavouriteMovies().subscribe({
      next: (data: any[]) => {
        this.favoriteMovies = data;
        this.checkFavoriteStatus(); // Check the favorite status when favorite movies are loaded
      },
      error: (error: any) => {
        console.error('Error fetching favorite movies:', error);
      }
    });
  }
}
